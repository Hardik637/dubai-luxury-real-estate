/**
 * High-Performance Scroll-Driven Video Engine
 * Renders 147 optimized frames onto full-screen HTML5 Canvas.
 * Synchronized with scroll progression with fluid interpolation (lerp).
 */

export class HeroScrollEngine {
  constructor(options = {}) {
    this.container = document.querySelector(options.containerSelector || '#hero-scroll-container');
    this.canvas = document.querySelector(options.canvasSelector || '#hero-canvas');
    this.totalFrames = options.totalFrames || 147;
    this.framePath = options.framePath || ((i) => `/hero-frames/frame_${String(i).padStart(4, '0')}.webp`);
    this.onProgress = options.onProgress || null;
    this.onComplete = options.onComplete || null;

    if (!this.container || !this.canvas) {
      console.error('HeroScrollEngine: Canvas or container not found');
      return;
    }

    this.ctx = this.canvas.getContext('2d', { alpha: false, desynchronized: true });
    this.images = new Array(this.totalFrames);
    this.loadedImages = new Set();
    
    this.currentFrameIndex = 0;
    this.targetFrameIndex = 0;
    this.scrollProgress = 0;
    this.targetProgress = 0;
    this.isTicking = false;

    this.init();
  }

  init() {
    this.handleResize();
    window.addEventListener('resize', () => this.handleResize(), { passive: true });

    // Load first frame with urgent priority to render immediately
    this.loadFirstFrame().then(() => {
      this.renderFrame(0);
      this.preloadAllFrames();
    });

    // Scroll listener
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    this.onScroll(); // initial state

    // Start RAF loop for smooth frame interpolation
    this.rafLoop();
  }

  handleResize() {
    const isMobile = window.innerWidth <= 768;
    // On high-DPR mobile screens, use full devicePixelRatio up to 2.5 for crystal-sharp retina clarity
    const dpr = isMobile 
      ? Math.min(window.devicePixelRatio || 1, 2.5)
      : Math.min(window.devicePixelRatio || 1, 2);

    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

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
    const totalScrollable = this.container.offsetHeight - window.innerHeight;
    
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
    if (!img) {
      for (let offset = 1; offset < 20; offset++) {
        if (clampedIndex - offset >= 0 && this.images[clampedIndex - offset]) {
          img = this.images[clampedIndex - offset];
          break;
        }
        if (clampedIndex + offset < this.totalFrames && this.images[clampedIndex + offset]) {
          img = this.images[clampedIndex + offset];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvas = this.canvas;
    const ctx = this.ctx;
    const cWidth = canvas.width;
    const cHeight = canvas.height;

    const isMobile = window.innerWidth <= 768;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (isMobile) {
      // MOBILE: FIT IN (CONTAIN) - ZERO CROPPING OF THE 16:9 FRAME
      ctx.fillStyle = '#080A0E';
      ctx.fillRect(0, 0, cWidth, cHeight);

      // Soft ambient background reflection to eliminate harsh black void and harmonize with frame lighting
      let ambientDrawn = false;
      try {
        if ('filter' in ctx) {
          ctx.save();
          ctx.filter = 'blur(45px) brightness(0.4)';
          ctx.drawImage(img, 0, 0, cWidth, cHeight);
          ctx.restore();
          ambientDrawn = true;
        }
      } catch (e) {}

      if (!ambientDrawn) {
        const grad = ctx.createLinearGradient(0, 0, 0, cHeight);
        grad.addColorStop(0, '#0E131B');
        grad.addColorStop(0.5, '#05070A');
        grad.addColorStop(1, '#0E131B');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, cWidth, cHeight);
      }

      // Calculate uncropped contain dimensions
      const scale = Math.min(cWidth / imgWidth, cHeight / imgHeight);
      const fitW = Math.round(imgWidth * scale);
      const fitH = Math.round(imgHeight * scale);
      const fitX = Math.round((cWidth - fitW) / 2);
      const fitY = Math.round((cHeight - fitH) / 2);

      ctx.drawImage(img, 0, 0, imgWidth, imgHeight, fitX, fitY, fitW, fitH);
    } else {
      // DESKTOP: UNTOUCHED - Clean cinematic cover
      const canvasRatio = cWidth / cHeight;
      const imgRatio = imgWidth / imgHeight;

      let sWidth, sHeight, sx, sy;

      if (imgRatio > canvasRatio) {
        sHeight = imgHeight;
        sWidth = imgHeight * canvasRatio;
        sx = (imgWidth - sWidth) / 2;
        sy = 0;
      } else {
        sWidth = imgWidth;
        sHeight = imgWidth / canvasRatio;
        sx = 0;
        sy = (imgHeight - sHeight) / 2;
      }

      ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cWidth, cHeight);
    }
  }
}
