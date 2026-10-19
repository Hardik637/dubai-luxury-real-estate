import fs from 'fs';
import path from 'path';

let memoryCache = {
  enquiries: null,
  properties: null
};

// Check if Vercel Blob is available
let blobClient = null;
try {
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID) {
    blobClient = await import('@vercel/blob');
  }
} catch (e) {
  // Local or fallback
}

/**
 * Load JSON data from Blob storage, local filesystem, or memory cache
 */
export async function loadData(key, defaultData = []) {
  if (memoryCache[key]) {
    return memoryCache[key];
  }

  // 1. Try Vercel Blob in production
  if (blobClient && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { blobs } = await blobClient.list({ prefix: `data/${key}.json` });
      if (blobs && blobs.length > 0) {
        const target = blobs[0];
        const res = await fetch(target.url);
        if (res.ok) {
          const parsed = await res.json();
          memoryCache[key] = parsed;
          return parsed;
        }
      }
    } catch (err) {
      console.warn(`[Blob Read Warning] ${key}:`, err.message);
    }
  }

  // 2. Try Local File System (data/*.json)
  try {
    const filePath = path.join(process.cwd(), 'data', `${key}.json`);
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryCache[key] = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn(`[FS Read Warning] ${key}:`, err.message);
  }

  // 3. Fallback
  memoryCache[key] = defaultData;
  return defaultData;
}

/**
 * Save JSON data to Blob storage, local filesystem, and memory cache
 */
export async function saveData(key, data) {
  memoryCache[key] = data;

  // 1. Save to Vercel Blob in production
  if (blobClient && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      await blobClient.put(`data/${key}.json`, JSON.stringify(data, null, 2), {
        access: 'public',
        addRandomSuffix: false
      });
    } catch (err) {
      console.warn(`[Blob Write Warning] ${key}:`, err.message);
    }
  }

  // 2. Save to local disk if writable
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, `${key}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    // Disk might be read-only in some serverless environments, memoryCache will still hold state
  }

  return data;
}
