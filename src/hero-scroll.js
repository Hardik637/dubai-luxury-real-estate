/**
 * High-Performance Scroll-Driven Video Engine
 * Renders 147 optimized frames onto full-screen HTML5 Canvas.
 * Synchronized with scroll progression with fluid interpolation (lerp).
 */

export class HeroScrollEngine {
  constructor(options = {}) {
    this.container = document.querySelector(options.containerSelector || '#hero-scroll-container');
    this.canvas = document.querySelector(options.canvasSelector || '#hero-canvas');
    this.onProgress = options.onProgress || null;
    this.onComplete = options.onComplete || null;

    // Desktop configuration (147 frames, 16:9 landscape)
    this.desktopTotalFrames = options.desktopTotalFrames || options.totalFrames || 147;
    this.desktopFramePath = options.desktopFramePath || options.framePath || ((i) => `/hero-frames/frame_${String(i).padStart(4, '0')}.webp`);

    // Mobile configuration (210 frames, 9:16 portrait)
    this.mobileTotalFrames = options.mobileTotalFrames || 210;
    this.mobileFramePath = options.mobileFramePath || ((i) => `/hero-frames-mobile/frame_${String(i).padStart(4, '0')}.webp`);

    if (!this.container || !this.canvas) {
      console.error('HeroScrollEngine: Canvas or container not found');
      return;
    }

    this.ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true });
    
    // Set up active frame mode (mobile vs desktop)
    this.setupActiveMode();

    this.currentFrameIndex = 0;
    this.targetFrameIndex = 0;
    this.scrollProgress = 0;
    this.targetProgress = 0;
    this.isTicking = false;

    this.init();
  }

  isMobileMode() {
    return window.innerWidth <= 768;
  }

  setupActiveMode() {
    this.isMobile = this.isMobileMode();
    this.totalFrames = this.isMobile ? this.mobileTotalFrames : this.desktopTotalFrames;
    this.framePath = this.isMobile ? this.mobileFramePath : this.desktopFramePath;
    this.images = new Array(this.totalFrames);
    this.loadedImages = new Set();
  }

  init() {
    let resizeRaf = null;
    const scheduleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        this.handleResize();
      });
    };

    this.handleResize();
    window.addEventListener('resize', scheduleResize, { passive: true });
    if (typeof window !== 'undefined' && window.visualViewport) {
      window.visualViewport.addEventListener('resize', scheduleResize, { passive: true });
    }
    window.addEventListener('orientationchange', () => {
      setTimeout(scheduleResize, 80);
    });

    // Auto-detect container & viewport resizes (e.g. mobile URL bar expand/collapse, DevTools)
    if (typeof ResizeObserver !== 'undefined' && this.container) {
      const ro = new ResizeObserver(() => scheduleResize());
      ro.observe(this.container);
      const viewport = this.container.querySelector('.hero-sticky-viewport');
      if (viewport) ro.observe(viewport);
    }

    // Load first frame with urgent priority to render immediately
    this.loadFirstFrame().then(() => {
      this.handleResize();
      this.renderFrame(0);
      window.dispatchEvent(new CustomEvent('hero-canvas-ready'));
      this.preloadAllFrames();
    });

    // Scroll listener
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.onScroll(); // initial state

    // Start RAF loop for smooth frame interpolation
    this.rafLoop();
  }

  handleResize() {
    if (!this.canvas) return;

    const newIsMobile = this.isMobileMode();
    if (newIsMobile !== this.isMobile) {
      // Gracefully switch between desktop and mobile modes on viewport crossover
      const prevProgress = this.totalFrames > 1 ? this.currentFrameIndex / (this.totalFrames - 1) : 0;
      this.setupActiveMode();
      this.currentFrameIndex = prevProgress * (this.totalFrames - 1);
      this.targetFrameIndex = this.currentFrameIndex;
      this.loadFirstFrame().then(() => {
        this.renderFrame(Math.round(this.currentFrameIndex));
        this.preloadAllFrames();
      });
    }

    const viewport = this.canvas.parentElement;
    const rect = viewport ? viewport.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };

    const width = Math.max(1, Math.round(rect.width || window.innerWidth));
    const height = Math.max(1, Math.round(rect.height || window.innerHeight));

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (this.canvas.width !== targetW || this.canvas.height !== targetH) {
      this.canvas.width = targetW;
      this.canvas.height = targetH;
    }

    const widthPx = `${width}px`;
    const heightPx = `${height}px`;
    if (this.canvas.style.width !== widthPx) {
      this.canvas.style.width = widthPx;
    }
    if (this.canvas.style.height !== heightPx) {
      this.canvas.style.height = heightPx;
    }

    this.cssWidth = width;
    this.cssHeight = height;
    this.dpr = dpr;

    if (this.ctx) {
      this.ctx.imageSmoothingEnabled = true;
      this.ctx.imageSmoothingQuality = 'high';
    }

    // Redraw current frame on resize
    this.renderFrame(Math.round(this.currentFrameIndex));
  }

  loadFirstFrame() {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = this.framePath(1);
      img.onload = () => {
        this.images[0] = img;
        this.loadedImages.add(0);
        resolve();
      };
      img.onerror = () => {
        console.warn('Could not load initial frame 1');
        resolve();
      };
    });
  }

  preloadAllFrames() {
    // Progressive priority preloading: load next few frames first, then remainder in batches
    const loadBatch = (indices) => {
      return Promise.all(
        indices.map((i) => {
          return new Promise((resolve) => {
            if (this.images[i]) return resolve();
            const img = new Image();
            img.src = this.framePath(i + 1);
            img.onload = () => {
              this.images[i] = img;
              this.loadedImages.add(i);
              resolve();
            };
            img.onerror = () => resolve();
          });
        })
      );
    };

    // Load first 20 frames immediately
    const immediateBatch = Array.from({ length: Math.min(25, this.totalFrames) }, (_, i) => i);
    loadBatch(immediateBatch).then(() => {
      // Load remainder with small delay
      const remainingBatches = [];
      const batchSize = 15;
      for (let i = 25; i < this.totalFrames; i += batchSize) {
        const batch = [];
        for (let j = i; j < Math.min(i + batchSize, this.totalFrames); j++) {
          batch.push(j);
        }
        remainingBatches.push(batch);
      }

      const runRemaining = async () => {
        for (const batch of remainingBatches) {
          await loadBatch(batch);
        }
      };

      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => runRemaining());
      } else {
        setTimeout(runRemaining, 50);
      }
    });
  }

  onScroll() {
    const rect = this.container.getBoundingClientRect();
    const viewport = this.container.querySelector('.hero-sticky-viewport');
    const viewportH = (viewport && viewport.clientHeight) ? viewport.clientHeight : window.innerHeight;
    const totalScrollable = this.container.offsetHeight - viewportH;
    
    if (totalScrollable <= 0) return;

    // rect.top goes from 0 down to -totalScrollable
    const scrolled = -rect.top;
    let progress = scrolled / totalScrollable;
    progress = Math.max(0, Math.min(1, progress));

    this.targetProgress = progress;
    this.targetFrameIndex = progress * (this.totalFrames - 1);

    if (this.onProgress) {
      this.onProgress(progress, this.targetFrameIndex);
    }
  }

  rafLoop() {
    // Smooth lerp (linear interpolation) for cinematic glide
    const lerpFactor = 0.18;
    const diff = this.targetFrameIndex - this.currentFrameIndex;

    if (Math.abs(diff) > 0.001) {
      this.currentFrameIndex += diff * lerpFactor;
      this.renderFrame(Math.round(this.currentFrameIndex));
    }

    requestAnimationFrame(() => this.rafLoop());
  }

  renderFrame(index) {
    if (!this.ctx) return;
    const clampedIndex = Math.max(0, Math.min(this.totalFrames - 1, index));
    
    let img = this.images[clampedIndex];

    // Fallback to nearest loaded frame if current hasn't finished loading
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Search backwards first (most relevant prior frame in sequence)
      for (let i = clampedIndex - 1; i >= 0; i--) {
        if (this.images[i] && this.images[i].complete && this.images[i].naturalWidth > 0) {
          img = this.images[i];
          break;
        }
      }
      // If none found backwards, search forwards
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let i = clampedIndex + 1; i < this.totalFrames; i++) {
          if (this.images[i] && this.images[i].complete && this.images[i].naturalWidth > 0) {
            img = this.images[i];
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = this.ctx;
    const width = this.cssWidth || (this.canvas.clientWidth || window.innerWidth);
    const height = this.cssHeight || (this.canvas.clientHeight || window.innerHeight);
    const dpr = this.dpr || Math.min(window.devicePixelRatio || 1, 2);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.clearRect(0, 0, width, height);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Full-bleed cinematic cover-fit (edge-to-edge on mobile and PC)
    const canvasRatio = width / height;
    const imgRatio = imgWidth / imgHeight;

    let sWidth, sHeight, sx, sy;

    if (imgRatio > canvasRatio) {
      // Screen is taller than image ratio (mobile portrait): Fill 100% height, center horizontally
      sHeight = imgHeight;
      sWidth = imgHeight * canvasRatio;
      sx = (imgWidth - sWidth) / 2;
      sy = 0;
    } else {
      // Screen is wider than image ratio (desktop/landscape): Fill 100% width, center vertically
      sWidth = imgWidth;
      sHeight = imgWidth / canvasRatio;
      sx = 0;
      sy = (imgHeight - sHeight) / 2;
    }

    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
  }
}
