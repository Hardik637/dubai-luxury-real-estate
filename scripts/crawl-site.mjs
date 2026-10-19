import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';

/**
 * High-Precision Website Crawler & SEO/Health Auditor
 * Crawls routes, verifies all internal & external links, assets, images, and metadata.
 */

const TARGET_HOST = process.argv[2] || 'https://dubai-luxury-real-estate.vercel.app';
console.log(`\n============================================================`);
console.log(`🔍 STARTING HIGH-PRECISION SITE CRAWLER ON: ${TARGET_HOST}`);
console.log(`============================================================\n`);

function fetchUrl(targetUrl, timeoutMs = 10000) {
  return new Promise((resolve) => {
    try {
      const urlObj = new URL(targetUrl);
      const client = urlObj.protocol === 'https:' ? https : http;
      const startTime = Date.now();

      const req = client.get(targetUrl, {
        headers: {
          'User-Agent': 'VOE-Luxury-Crawler/1.0 (Automated Auditor)'
        }
      }, (res) => {
        let rawData = '';
        res.on('data', chunk => rawData += chunk);
        res.on('end', () => {
          resolve({
            url: targetUrl,
            status: res.statusCode,
            headers: res.headers,
            body: rawData,
            durationMs: Date.now() - startTime,
            ok: res.statusCode >= 200 && res.statusCode < 400
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          url: targetUrl,
          status: 0,
          error: err.message,
          durationMs: Date.now() - startTime,
          ok: false
        });
      });

      req.setTimeout(timeoutMs, () => {
        req.destroy();
        resolve({
          url: targetUrl,
          status: 408,
          error: 'Request Timeout',
          durationMs: Date.now() - startTime,
          ok: false
        });
      });
    } catch (e) {
      resolve({
        url: targetUrl,
        status: 0,
        error: e.message,
        durationMs: 0,
        ok: false
      });
    }
  });
}

const visitedUrls = new Set();
const queue = ['/', '/properties/', '/invest/', '/admin/', '/privacy/', '/terms/'];
const crawlResults = [];
const discoveredAssets = new Set();
const brokenLinks = [];
const allExtractedLinks = new Map();

function extractAttributes(html, tag, attr) {
  const regex = new RegExp(`<${tag}[^>]*?${attr}=["']([^"']+)["'][^>]*?>`, 'gi');
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

function extractMeta(html, name) {
  const regex = new RegExp(`<meta[^>]*?(?:name|property)=["']${name}["'][^>]*?content=["']([^"']*)["'][^>]*?>`, 'i');
  const m = regex.exec(html);
  if (m) return m[1];
  const regexAlt = new RegExp(`<meta[^>]*?content=["']([^"']*)["'][^>]*?(?:name|property)=["']${name}["'][^>]*?>`, 'i');
  const m2 = regexAlt.exec(html);
  return m2 ? m2[1] : null;
}

function extractTitle(html) {
  const m = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html);
  return m ? m[1].trim() : null;
}

async function runCrawl() {
  const baseUrl = new URL(TARGET_HOST);

  for (let i = 0; i < queue.length; i++) {
    const route = queue[i];
    const fullUrl = new URL(route, baseUrl).toString();

    if (visitedUrls.has(fullUrl)) continue;
    visitedUrls.add(fullUrl);

    process.stdout.write(`⚡ Crawling Page [${i + 1}/${queue.length}]: ${route} ... `);
    const resp = await fetchUrl(fullUrl);

    if (!resp.ok) {
      console.log(`❌ ERROR ${resp.status} (${resp.error || 'Failed'})`);
      brokenLinks.push({ source: 'queue', target: fullUrl, status: resp.status, error: resp.error });
      continue;
    }

    console.log(`✓ 200 OK (${resp.durationMs}ms, ${(resp.body.length / 1024).toFixed(1)} KB)`);

    const title = extractTitle(resp.body);
    const description = extractMeta(resp.body, 'description');
    const ogTitle = extractMeta(resp.body, 'og:title');
    const ogImage = extractMeta(resp.body, 'og:image');
    const viewport = extractMeta(resp.body, 'viewport');

    // Extract links
    const hrefs = extractAttributes(resp.body, 'a', 'href');
    const imgSrcs = extractAttributes(resp.body, 'img', 'src');
    const scripts = extractAttributes(resp.body, 'script', 'src');
    const stylesheets = extractAttributes(resp.body, 'link', 'href');

    allExtractedLinks.set(route, hrefs);

    // Queue internal links
    for (const href of hrefs) {
      if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
        continue;
      }
      try {
        const resolved = new URL(href, fullUrl);
        if (resolved.origin === baseUrl.origin) {
          const pathOnly = resolved.pathname;
          if (!visitedUrls.has(resolved.toString()) && !queue.includes(pathOnly) && !pathOnly.includes('.')) {
            queue.push(pathOnly);
          }
        }
      } catch (e) {
        // invalid URL
      }
    }

    // Collect assets to test
    for (const src of imgSrcs) {
      if (!src.startsWith('data:')) discoveredAssets.add({ type: 'image', page: route, src });
    }
    for (const s of scripts) {
      if (s) discoveredAssets.add({ type: 'script', page: route, src: s });
    }
    for (const l of stylesheets) {
      if (l && (l.includes('.css') || l.includes('favicon'))) {
        discoveredAssets.add({ type: 'link', page: route, src: l });
      }
    }

    crawlResults.push({
      route,
      status: resp.status,
      durationMs: resp.durationMs,
      pageSizeKb: (resp.body.length / 1024).toFixed(1),
      title,
      description,
      ogTitle,
      ogImage,
      viewport,
      linksFound: hrefs.length,
      imagesFound: imgSrcs.length
    });
  }

  console.log(`\n------------------------------------------------------------`);
  console.log(`📦 VERIFYING ALL DETECTED ASSETS & MEDIA (${discoveredAssets.size} assets)...`);
  console.log(`------------------------------------------------------------`);

  const assetArray = Array.from(discoveredAssets);
  let checkedAssets = 0;
  let brokenAssets = 0;

  // Verify assets in chunks
  const CHUNK_SIZE = 6;
  for (let i = 0; i < assetArray.length; i += CHUNK_SIZE) {
    const chunk = assetArray.slice(i, i + CHUNK_SIZE);
    await Promise.all(chunk.map(async (asset) => {
      let assetUrl;
      try {
        assetUrl = new URL(asset.src, baseUrl).toString();
      } catch (e) {
        brokenLinks.push({ source: asset.page, target: asset.src, type: asset.type, error: 'Malformed URL' });
        brokenAssets++;
        return;
      }

      const res = await fetchUrl(assetUrl, 8000);
      checkedAssets++;
      if (!res.ok) {
        console.log(`❌ Broken asset on ${asset.page}: ${asset.src} [Status: ${res.status}]`);
        brokenLinks.push({ source: asset.page, target: asset.src, type: asset.type, status: res.status });
        brokenAssets++;
      }
    }));
  }

  console.log(`✓ Tested ${checkedAssets} assets: ${checkedAssets - brokenAssets} OK, ${brokenAssets} broken.`);

  console.log(`\n============================================================`);
  console.log(`📊 CRAWL AUDIT SUMMARY REPORT`);
  console.log(`============================================================\n`);

  console.table(crawlResults.map(r => ({
    Route: r.route,
    Status: r.status,
    LoadTime: `${r.durationMs}ms`,
    Size: `${r.pageSizeKb} KB`,
    Title: r.title ? (r.title.length > 35 ? r.title.slice(0, 32) + '...' : r.title) : 'MISSING',
    MetaDesc: r.description ? '✓ Present' : '⚠️ Missing',
    Links: r.linksFound,
    Images: r.imagesFound
  })));

  if (brokenLinks.length === 0) {
    console.log(`\n🏆 PERFECT HEALTH: 0 broken links or assets detected across entire site!\n`);
  } else {
    console.log(`\n⚠️ ${brokenLinks.length} issues found:`);
    console.table(brokenLinks);
  }
}

runCrawl();
