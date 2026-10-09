import { HeroScrollEngine } from './hero-scroll.js';
import { PROPERTIES, EXCHANGE_RATES } from './properties-data.js';
import { submitEnquiry } from './services/enquiries.js';
import { getSignatureProperties } from './services/properties.js';

let activeCatalogProperties = [...PROPERTIES];

let state = {
  currency: 'AED',
  category: 'all',
  isAudioPlaying: false
};

// Master Communities Data (Sobha-style Ecosystems)
const MASTER_COMMUNITIES = {
  forest: {
    badge: "BIOPHILIC LAGOON LIVING • 40% GREEN CANOPY",
    title: "The Forest Sanctuary",
    image: "/images/forest_villa.jpg",
    desc: "Surrounded by thousands of mature trees, shaded walking paths, and crystalline freshwater lagoons that naturally lower ambient temperature by 4°C. Complete with private international schools and wellness pavilions.",
    features: ["Crystal Bio-Lagoon", "North London Collegiate School (3 min)", "Private Forest Villas"],
    estateId: "estate-dubai-hills",
    blueprint: {
      title: "The Forest Sanctuary Masterplan",
      stats: [
        { val: "350 Acres", lbl: "Total Enclave Area" },
        { val: "40% Canopy", lbl: "Protected Green Parkland" },
        { val: "1.8M Sq.Ft.", lbl: "Crystal Bio-Lagoon" },
        { val: "3 Minutes", lbl: "North London Collegiate School" },
        { val: "12 Minutes", lbl: "Downtown Dubai & DIFC" },
        { val: "100% Freehold", lbl: "Sovereign Title Deed" }
      ]
    }
  },
  island: {
    badge: "PRIVATE ISLAND ENCLAVE • ARABIAN GULF",
    title: "The Island Reserve",
    image: "/images/jumeirah_bay_island.jpg",
    desc: "An exclusive seahorse island sanctuary offering private white sand beaches, dedicated 120ft superyacht berths, and direct open sea departures.",
    features: ["120ft Superyacht Slip", "Bulgari Resort Proximity", "Private Beachfront"],
    estateId: "estate-jumeirah-bay",
    blueprint: {
      title: "The Island Reserve Masterplan",
      stats: [
        { val: "6.3M Sq.Ft.", lbl: "Seahorse Island Footprint" },
        { val: "40m Frontage", lbl: "Direct Open Gulf Seafront" },
        { val: "120ft Berth", lbl: "Dedicated Superyacht Slip" },
        { val: "2 Minutes", lbl: "Bulgari Marina & Yacht Club" },
        { val: "15 Minutes", lbl: "Dubai International Airport" },
        { val: "100% Freehold", lbl: "Sovereign Title Deed" }
      ]
    }
  },
  harbour: {
    badge: "MEDITERRANEAN MARITIME LIVING • DEEPWATER MARINA",
    title: "The Superyacht Harbour",
    image: "/images/yacht_lifestyle.jpg",
    desc: "The Middle East's premier nautical district. Shaded palm promenades, Michelin-starred coastal dining, and sunset sailing into the open Gulf.",
    features: ["160m Berth Capacity", "Dubai Harbour Yacht Club", "Bluewaters Access"],
    estateId: "estate-harbour-residence",
    blueprint: {
      title: "The Superyacht Harbour Masterplan",
      stats: [
        { val: "20M Sq.Ft.", lbl: "Maritime District Scale" },
        { val: "700 Berths", lbl: "Deepwater Yacht Marina" },
        { val: "1.2 km", lbl: "Direct Coastal Beachfront" },
        { val: "Direct Pier", lbl: "Dubai Harbour Yacht Club" },
        { val: "5 Minutes", lbl: "Palm Jumeirah & Marina" },
        { val: "100% Freehold", lbl: "Sovereign Title Deed" }
      ]
    }
  },
  dunes: {
    badge: "TOTAL ACOUSTIC STILLNESS • EMIRATES HILLS",
    title: "The Desert Oasis",
    image: "/images/desert_sunset.jpg",
    desc: "Vast architectural volumes framed by 200-year-old olive courtyards, championship golf fairways, and natural bio-lagoon pools where silence reigns.",
    features: ["Acoustic Seclusion", "Montgomerie Fairways", "Gated Security Perimeter"],
    estateId: "estate-emirates-hills",
    blueprint: {
      title: "The Desert Oasis Masterplan",
      stats: [
        { val: "520 Acres", lbl: "Private Golf Enclave" },
        { val: "18-Hole", lbl: "Championship Fairways" },
        { val: "Acoustic <28dB", lbl: "Silent Desert Ambient" },
        { val: "24/7 Gated", lbl: "Biometric Perimeter Security" },
        { val: "10 Minutes", lbl: "Dubai Marina & Media City" },
        { val: "100% Freehold", lbl: "Sovereign Title Deed" }
      ]
    }
  },
  sky: {
    badge: "PRESIDENTIAL SKY DUPLEXES • DOWNTOWN DUBAI",
    title: "The Sovereign Sky",
    image: "/images/twilight_terrace.jpg",
    desc: "Double-height sky residences floating above the clouds with 360-degree panoramas of the Burj Khalifa and Arabian Gulf, attended by private concierges.",
    features: ["Private Sky Lap Pool", "Direct Biometric Elevator", "Opera District Access"],
    estateId: "estate-downtown-penthouse",
    blueprint: {
      title: "The Sovereign Sky Masterplan",
      stats: [
        { val: "Levels 65-72", lbl: "Crowning Sky Duplexes" },
        { val: "7.2m Ceilings", lbl: "Double-Height Glass Volumes" },
        { val: "360° Panoramas", lbl: "Burj Khalifa & Persian Gulf" },
        { val: "Private Lift", lbl: "Direct Biometric Penthouse Access" },
        { val: "3 Minutes", lbl: "Dubai Opera & Fashion Avenue" },
        { val: "100% Freehold", lbl: "Sovereign Title Deed" }
      ]
    }
  }
};

// Craftsmanship Lab Materials Data
const CRAFT_MATERIALS = {
  marble: {
    title: "Direct Quarry Stone & Book-Matching",
    sub: "Italian Calacatta & Fluted Solid Walnut",
    img: "/images/craft_detail.jpg"
  },
  acoustic: {
    title: "Acoustic & Thermal Decoupling (42dB)",
    sub: "Triple-Laminated Acoustic Low-E Facades",
    img: "/images/penthouse_interior.jpg"
  },
  joinery: {
    title: "Proprietary German Joinery & Metalwork",
    sub: "Solid Fluted European Walnut & Brushed Bronze",
    img: "/images/craft_detail.jpg"
  },
  biophilic: {
    title: "Self-Sustaining Biophilic Ecosystems",
    sub: "Chlorine-Free Crystal Bio-Lagoons (-4°C Cooling)",
    img: "/images/forest_villa.jpg"
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initPagePreloader();
  initHeroScroll();
  initNavigation();
  initAmbientAudio();
  initCurrencySelector();
  initActivitiesShowcase();
  initLifestyleCarousel();
  initWhyDubaiExperience();
  initSovereignCalculator();
  initBidirectionalScrollReveals();
  initVisualCatalog();
  initMobileCarousels();
  initHeroFilterSearch();
  initModals();
  initForms();
});

/* ==========================================================================
   0. TRANSLUCENT LUXURY PAGE PRELOADER
   - Minimum 2.0s presentation time
   - Waits for window load + hero canvas frame 0 to avoid glitches
   - Smooth cinematic fade out
   ========================================================================== */
function initPagePreloader() {
  const preloader = document.getElementById('page-preloader');
  const progressBar = document.getElementById('preloader-progress-bar');
  if (!preloader) return;

  document.body.classList.add('is-loading');

  const startTime = performance.now();
  let isWindowLoaded = (document.readyState === 'complete');
  let isHeroReady = false;
  let hasDismissed = false;

  // Track progress bar visually
  let progress = 15;
  if (progressBar) progressBar.style.width = '15%';

  const progressInterval = setInterval(() => {
    if (progress < 90) {
      progress += (90 - progress) * 0.12;
      if (progressBar) progressBar.style.width = `${Math.min(90, Math.round(progress))}%`;
    }
  }, 100);

  const checkAndDismiss = () => {
    if (hasDismissed) return;
    if (!isWindowLoaded || !isHeroReady) return;

    const elapsed = performance.now() - startTime;
    // Enforce minimum 2 seconds (2000ms)
    const remainingDelay = Math.max(0, 2000 - elapsed);

    hasDismissed = true;

    setTimeout(() => {
      clearInterval(progressInterval);
      if (progressBar) progressBar.style.width = '100%';

      setTimeout(() => {
        preloader.classList.add('is-hidden');
        document.body.classList.remove('is-loading');
        
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 900);
      }, 180);
    }, remainingDelay);
  };

  if (!isWindowLoaded) {
    window.addEventListener('load', () => {
      isWindowLoaded = true;
      checkAndDismiss();
    });
  }

  window.addEventListener('hero-canvas-ready', () => {
    isHeroReady = true;
    checkAndDismiss();
  });

  // Safety fallback after 6s in case of an unreachable network asset
  setTimeout(() => {
    isWindowLoaded = true;
    isHeroReady = true;
    checkAndDismiss();
  }, 6000);
}

/* ==========================================================================
   1. HERO SCROLL ENGINE
   ========================================================================== */
function initHeroScroll() {
  const navbar = document.getElementById('main-navbar');
  const heroContainer = document.getElementById('hero-scroll-container');

  const updateNavbarState = () => {
    if (!navbar || !heroContainer) return;
    const heroRect = heroContainer.getBoundingClientRect();
    // After completing the hero section (when the bottom of the hero reaches the top of the viewport)
    if (heroRect.bottom <= 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Trigger mobile auto-carousels only once hero banner scrolling is done
    if (heroRect.bottom <= window.innerHeight + 80) {
      notifyHeroScrollCompleted();
    }
  };

  new HeroScrollEngine({
    containerSelector: '#hero-scroll-container',
    canvasSelector: '#hero-canvas',
    desktopTotalFrames: 147,
    desktopFramePath: (num) => `/hero-frames/frame_${String(num).padStart(4, '0')}.webp`,
    mobileTotalFrames: 210,
    mobileFramePath: (num) => `/hero-frames-mobile/frame_${String(num).padStart(4, '0')}.webp`,
    onProgress: (progress) => {
      updateNavbarState();
      if (progress >= 0.95) {
        notifyHeroScrollCompleted();
      }
    }
  });

  window.addEventListener('scroll', updateNavbarState, { passive: true });
  updateNavbarState();
}

/* ==========================================================================
   2. AMBIENT AUDIO SYNTHESIZER (WEB AUDIO API - GENTLE COASTAL WAVES)
   ========================================================================== */
let audioCtx = null;
let waveGain = null;
let waveInterval = null;

function initAmbientAudio() {
  const audioBtn = document.getElementById('audio-toggle');
  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    if (!state.isAudioPlaying) {
      startAmbientSound();
      audioBtn.classList.add('playing');
      state.isAudioPlaying = true;
    } else {
      stopAmbientSound();
      audioBtn.classList.remove('playing');
      state.isAudioPlaying = false;
    }
  });
}

function startAmbientSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // Generate soothing pink noise for ocean waves
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Low pass filter to create a warm, gentle underwater / coastal rumble
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, audioCtx.currentTime);

    // Dynamic wave gain simulating ocean swells
    waveGain = audioCtx.createGain();
    waveGain.gain.setValueAtTime(0.01, audioCtx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(audioCtx.destination);
    whiteNoise.start();

    // Rhythmic swell animation
    const swell = () => {
      if (!state.isAudioPlaying || !waveGain) return;
      const now = audioCtx.currentTime;
      waveGain.gain.cancelScheduledValues(now);
      waveGain.gain.setValueAtTime(waveGain.gain.value, now);
      waveGain.gain.linearRampToValueAtTime(0.08, now + 3);
      waveGain.gain.linearRampToValueAtTime(0.01, now + 7);
    };

    swell();
    waveInterval = setInterval(swell, 7500);
  } catch (e) {
    console.warn('Ambient audio error:', e);
  }
}

function stopAmbientSound() {
  if (waveInterval) clearInterval(waveInterval);
  if (waveGain && audioCtx) {
    waveGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
  }
}

/* ==========================================================================
   2. ACTIVITIES & SPORTS SHOWCASE (LAZY PRELOAD & INSTANT AUTOPLAY)
   ========================================================================== */
function initActivitiesShowcase() {
  const section = document.getElementById('activities');
  if (!section) return;

  const videos = Array.from(section.querySelectorAll('.activity-showcase-video'));
  if (!videos.length) return;

  // Ensure all videos are properly muted and configured for mobile inline playback
  videos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // If video has src and is loaded, play as soon as ready
    video.addEventListener('canplay', () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    }, { once: true });
  });

  function playAllVideos() {
    videos.forEach((video) => {
      video.muted = true;
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      }
    });
  }

  function pauseAllVideos() {
    videos.forEach((video) => {
      if (!video.paused) {
        video.pause();
      }
    });
  }

  // Autoplay as soon as activities section approaches viewport
  if ('IntersectionObserver' in window) {
    const playbackObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playAllVideos();
          } else {
            pauseAllVideos();
          }
        });
      },
      {
        root: null,
        rootMargin: '200px 0px 200px 0px',
        threshold: 0.02
      }
    );
    playbackObserver.observe(section);
  } else {
    playAllVideos();
  }

  // Backup trigger on first user interaction (touch/scroll) to ensure mobile compliance
  const startAutoplayOnInteraction = () => {
    playAllVideos();
    window.removeEventListener('touchstart', startAutoplayOnInteraction);
    window.removeEventListener('scroll', startAutoplayOnInteraction);
  };
  window.addEventListener('touchstart', startAutoplayOnInteraction, { passive: true, once: true });
  window.addEventListener('scroll', startAutoplayOnInteraction, { passive: true, once: true });

  // Click / tap to toggle play/pause
  videos.forEach((video) => {
    video.addEventListener('click', () => {
      if (video.paused) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  });
}


/* ==========================================================================
   3.1.5 SENSORY LIVING: FULL-SIZE PANORAMIC MOMENTS (SMOOTH CROSSFADE CAROUSEL)
   ========================================================================== */
function initLifestyleCarousel() {
  const stage = document.getElementById('lifestyle-stage');
  if (!stage) return;

  const cards = stage.querySelectorAll('.panoramic-moment-card');
  const indicators = stage.querySelectorAll('.lifestyle-indicators .indicator-bar');
  const prevBtn = document.getElementById('lifestyle-prev-btn');
  const nextBtn = document.getElementById('lifestyle-next-btn');
  const zonePrev = document.getElementById('lifestyle-zone-prev');
  const zoneNext = document.getElementById('lifestyle-zone-next');
  if (cards.length === 0) return;

  let currentIndex = 0;
  let isHovered = false;
  let isInView = true;

  function updateLifestyleIndicators(index) {
    indicators.forEach((ind, i) => {
      const fill = ind.querySelector('.loading-fill');
      if (i < index) {
        ind.classList.remove('active');
        ind.classList.add('completed');
        if (fill) fill.style.animation = 'none';
      } else if (i === index) {
        ind.classList.remove('completed');
        ind.classList.add('active');
        if (fill) {
          fill.style.animation = 'none';
          void fill.offsetWidth; // Force CSS reflow to re-trigger 4.5s animation
          fill.style.animation = '';
        }
      } else {
        ind.classList.remove('active', 'completed');
        if (fill) fill.style.animation = 'none';
      }
    });

    const activeInd = indicators[index];
    const activeFill = activeInd ? activeInd.querySelector('.loading-fill') : null;
    if (activeFill) {
      activeFill.onanimationend = null;
      activeFill.onanimationend = () => {
        if (!isHovered && isInView) {
          nextMoment();
        }
      };
    }
  }

  function showMoment(index) {
    if (index === currentIndex && cards[index].classList.contains('active')) return;
    cards.forEach((card, i) => {
      if (i === index) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    currentIndex = index;
    updateLifestyleIndicators(currentIndex);
  }

  function nextMoment() {
    const nextIdx = (currentIndex + 1) % cards.length;
    showMoment(nextIdx);
  }

  function prevMoment() {
    const prevIdx = (currentIndex - 1 + cards.length) % cards.length;
    showMoment(prevIdx);
  }

  // Navigation Arrows & Hitbox Zones
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevMoment();
    });
  }
  if (zonePrev) {
    zonePrev.addEventListener('click', (e) => {
      if (e.target !== prevBtn && !prevBtn.contains(e.target)) {
        prevMoment();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextMoment();
    });
  }
  if (zoneNext) {
    zoneNext.addEventListener('click', (e) => {
      if (e.target !== nextBtn && !nextBtn.contains(e.target)) {
        nextMoment();
      }
    });
  }

  // Direct Click on Story Loading Bars
  indicators.forEach((ind) => {
    ind.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(ind.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        showMoment(idx);
      }
    });
  });

  // Pause on hover
  stage.addEventListener('mouseenter', () => {
    isHovered = true;
  });

  stage.addEventListener('mouseleave', () => {
    isHovered = false;
    // If animation completed or reached near 100% while hovered
    const activeFill = indicators[currentIndex]?.querySelector('.loading-fill');
    if (activeFill) {
      const computed = window.getComputedStyle(activeFill);
      const curW = parseFloat(computed.width);
      const parentW = activeFill.parentElement.offsetWidth;
      if (parentW > 0 && curW >= parentW - 1) {
        nextMoment();
      }
    }
  });

  // Touch swipe support on mobile devices
  let touchStartX = 0;
  let touchStartY = 0;
  stage.addEventListener('touchstart', (e) => {
    isHovered = true;
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  stage.addEventListener('touchend', (e) => {
    setTimeout(() => { isHovered = false; }, 2000);
    if (e.changedTouches && e.changedTouches.length > 0) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
          nextMoment();
        } else {
          prevMoment();
        }
      }
    }
  }, { passive: true });

  // Only auto-play when section is visible in viewport
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isInView = entry.isIntersecting;
        if (!isInView) {
          stage.classList.add('is-paused');
        } else {
          stage.classList.remove('is-paused');
        }
      });
    }, { threshold: 0.15 });
    observer.observe(stage);
  }

  // Initialize indicators for initial moment
  updateLifestyleIndicators(0);
}

/* ==========================================================================
   3.1 WHY DUBAI EDITORIAL EXPERIENCE: PILLARS & GLOBAL POSITIONING
   ========================================================================== */
function initWhyDubaiExperience() {
  // 1. Three Interactive Pillars (Capital, Residency, Lifestyle)
  const pillarsContainer = document.getElementById('why-pillars-container');
  const pillarCards = document.querySelectorAll('.pillar-card');

  if (pillarsContainer && pillarCards.length > 0) {
    pillarCards.forEach((card) => {
      // Toggle / activate pillar on click or keydown (Enter/Space)
      card.addEventListener('click', (e) => {
        // If clicking inside a link or button, let that action proceed
        if (e.target.closest('a, button')) return;

        const isMobile = window.innerWidth <= 840;

        if (isMobile) {
          // Mobile Accordion behavior: toggle current card, close others
          const wasActive = card.classList.contains('is-active');
          pillarCards.forEach((c) => c.classList.remove('is-active'));
          if (!wasActive) {
            card.classList.add('is-active');
          }
        } else {
          // Desktop: ensure clicked pillar becomes active, others inactive
          pillarCards.forEach((c) => c.classList.remove('is-active'));
          card.classList.add('is-active');
        }
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          if (!e.target.closest('a, button')) {
            e.preventDefault();
            pillarCards.forEach((c) => c.classList.remove('is-active'));
            card.classList.add('is-active');
          }
        }
      });
    });

    // Desktop hover hint: when mouse leaves container, restore the currently active card
    pillarsContainer.addEventListener('mouseleave', () => {
      if (window.innerWidth > 840) {
        const activeCard = pillarsContainer.querySelector('.pillar-card.is-active');
        if (!activeCard && pillarCards[0]) {
          pillarCards[0].classList.add('is-active');
        }
      }
    });
  }

  // 2. Pillar 3: Lifestyle Sequence Moments (07:00, 12:00, 18:00, 23:00)
  const seqTabs = document.querySelectorAll('.seq-tab-btn');
  const seqSlides = document.querySelectorAll('.seq-slide');

  if (seqTabs.length > 0 && seqSlides.length > 0) {
    seqTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIndex = tab.getAttribute('data-seq');

        seqTabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        seqSlides.forEach((slide) => {
          if (slide.getAttribute('data-seq-index') === targetIndex) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });
      });
    });
  }

  // 3. Smooth scroll for "Explore the numbers" button
  const exploreNumbersBtn = document.getElementById('btn-explore-numbers');
  if (exploreNumbersBtn) {
    exploreNumbersBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('capital-scenario');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // 4. Global Positioning Interactive Hub Nodes
  const marketNodes = document.querySelectorAll('.market-node');
  const epicenter = document.getElementById('epicenter-dubai');

  if (marketNodes.length > 0) {
    marketNodes.forEach((node) => {
      const city = node.getAttribute('data-city');
      const connectionLine = document.querySelector(`.hub-line-${city}`);

      const activateNode = () => {
        marketNodes.forEach((n) => n.classList.remove('is-highlighted'));
        document.querySelectorAll('.hub-line').forEach((l) => l.classList.remove('is-active'));

        node.classList.add('is-highlighted');
        if (connectionLine) connectionLine.classList.add('is-active');
        if (epicenter) epicenter.classList.add('is-transmitting');
      };

      const deactivateNode = () => {
        node.classList.remove('is-highlighted');
        if (connectionLine) connectionLine.classList.remove('is-active');
        if (epicenter) epicenter.classList.remove('is-transmitting');
      };

      node.addEventListener('mouseenter', activateNode);
      node.addEventListener('mouseleave', deactivateNode);
      node.addEventListener('focus', activateNode);
      node.addEventListener('blur', deactivateNode);

      // Support tap on mobile
      node.addEventListener('click', () => {
        const isHighlight = node.classList.contains('is-highlighted');
        if (isHighlight) {
          deactivateNode();
        } else {
          activateNode();
        }
      });
    });
  }
}

/* ==========================================================================
   3.2 SOVEREIGN WEALTH & YIELD CALCULATOR
   ========================================================================== */
let currentCalculatorBudgetAED = 25000000;

function updateSovereignCalculator() {
  const displayBudget = document.getElementById('calc-display-budget');
  const displayTax = document.getElementById('calc-tax-saved');
  const displayYield = document.getElementById('calc-net-yield');
  const displayMonthlyYield = document.getElementById('calc-monthly-yield');
  const display5YearGain = document.getElementById('calc-5year-gain');
  const displayVisa = document.getElementById('calc-visa-status');

  // Scenario specific display elements
  const scenYourCapital = document.getElementById('scen-your-capital');
  const scenPropValue = document.getElementById('scen-prop-value');
  const scenYieldPct = document.getElementById('scen-yield-pct');

  const currInfo = EXCHANGE_RATES[state.currency] || EXCHANGE_RATES.AED;
  const rate = currInfo.rate;
  const curr = state.currency;

  const convertedBudget = Math.round(currentCalculatorBudgetAED * rate);
  const taxSaved = Math.round(currentCalculatorBudgetAED * 0.084 * 0.45 * rate);
  const netYield = Math.round(currentCalculatorBudgetAED * 0.082 * rate);
  const monthlyYield = Math.round(netYield / 12);
  const fiveYearGain = Math.round((netYield * 5) + (currentCalculatorBudgetAED * 0.35 * rate));

  const formatCurr = (val) => {
    if (curr === 'AED') return `AED ${val.toLocaleString()}`;
    if (curr === 'USD') return `$${val.toLocaleString()}`;
    if (curr === 'EUR') return `€${val.toLocaleString()}`;
    if (curr === 'GBP') return `£${val.toLocaleString()}`;
    return `${val.toLocaleString()} ${curr}`;
  };

  if (displayBudget) displayBudget.textContent = formatCurr(convertedBudget);
  if (scenYourCapital) scenYourCapital.textContent = formatCurr(convertedBudget);
  if (scenPropValue) scenPropValue.textContent = formatCurr(convertedBudget);

  if (displayTax) displayTax.textContent = formatCurr(taxSaved);
  if (displayYield) displayYield.textContent = formatCurr(netYield);
  if (displayMonthlyYield) displayMonthlyYield.textContent = `~${formatCurr(monthlyYield)} / month`;
  if (display5YearGain) display5YearGain.textContent = formatCurr(fiveYearGain);
  if (scenYieldPct) scenYieldPct.textContent = '8.2%*';

  if (displayVisa) {
    if (currentCalculatorBudgetAED >= 2000000) {
      displayVisa.textContent = "Potential pathway";
    } else {
      displayVisa.textContent = "Under min. threshold";
    }
  }
}

function initSovereignCalculator() {
  const slider = document.getElementById('sovereign-slider');
  if (!slider) return;

  slider.addEventListener('input', (e) => {
    currentCalculatorBudgetAED = parseFloat(e.target.value) || 25000000;
    updateSovereignCalculator();
  });

  updateSovereignCalculator();
}

/* ==========================================================================
   3.3 MOBILE-ONLY AUTOMATIC CAROUSEL ENGINE
   - STRICT GUARD: Only operates when window.innerWidth <= 768px (never touches PC view)
   - Automatically scrolls horizontally through components with items exceeding one row
   - Allows natural finger swipe anytime with smooth native scroll-snap
   - Pauses on user touch/drag and resumes automatically
   - Zero dots / bullets (as instructed: "dont need the dots to navigate just swiping should do the trick")
   ========================================================================== */
let mobileCarouselTimers = [];
let mobileCarouselObservers = [];
let isHeroBannerScrollDone = false;

function notifyHeroScrollCompleted() {
  if (isHeroBannerScrollDone) return;
  isHeroBannerScrollDone = true;
  activateMobileCarousels();
}

function initMobileCarousels() {
  // Clear any existing timers and observers
  mobileCarouselTimers.forEach((t) => clearInterval(t));
  mobileCarouselTimers = [];
  mobileCarouselObservers.forEach((obs) => obs.disconnect());
  mobileCarouselObservers = [];

  // STRICT GUARD: DO NOTHING ON PC/DESKTOP VIEW
  if (window.innerWidth > 768) return;

  const carouselSelectors = [
    '.heritage-stats-grid',
    '.activities-grid',
    '.sobha-pillars-grid',
    '.sovereign-pillars-grid',
    '.sovereign-lifestyle-grid',
    '.calc-results-grid',
    '.visual-cinema-grid'
  ];

  // Immediately ensure all containers start cleanly at scrollLeft = 0 (never offset on load)
  carouselSelectors.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollLeft = 0;
  });

  // If hero is already done (or no hero container present), activate carousels
  const heroContainer = document.getElementById('hero-scroll-container');
  if (!heroContainer) {
    notifyHeroScrollCompleted();
    return;
  }

  const rect = heroContainer.getBoundingClientRect();
  if (rect.bottom <= window.innerHeight + 80) {
    notifyHeroScrollCompleted();
  }
}

function activateMobileCarousels() {
  // STRICT GUARD: DO NOTHING ON PC/DESKTOP VIEW
  if (window.innerWidth > 768) return;

  const carouselTargets = [
    { sel: '.heritage-stats-grid', interval: 4000 },
    { sel: '.activities-grid', interval: 4000 },
    { sel: '.sobha-pillars-grid', interval: 4200 },
    { sel: '.sovereign-pillars-grid', interval: 3800 },
    { sel: '.sovereign-lifestyle-grid', interval: 4000 },
    { sel: '.calc-results-grid', interval: 4000 },
    { sel: '.visual-cinema-grid', interval: 4400 }
  ];

  carouselTargets.forEach(({ sel, interval }) => {
    const container = document.querySelector(sel);
    if (!container) return;

    let isInteracting = false;
    let resumeTimeout = null;
    let timer = null;

    const pause = () => {
      isInteracting = true;
      if (resumeTimeout) clearTimeout(resumeTimeout);
    };

    const resume = () => {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isInteracting = false;
      }, 4500);
    };

    container.addEventListener('touchstart', pause, { passive: true });
    container.addEventListener('touchend', resume, { passive: true });
    container.addEventListener('touchcancel', resume, { passive: true });

    const advanceSlide = () => {
      if (window.innerWidth > 768 || isInteracting) return;

      const cards = Array.from(container.children).filter(
        (el) => el.nodeType === 1 && !el.classList.contains('carousel-spacer')
      );
      if (cards.length <= 1) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScroll - 25) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      const containerLeft = container.getBoundingClientRect().left;
      const nextCard = cards.find((card) => {
        const cardLeft = card.getBoundingClientRect().left;
        return cardLeft - containerLeft > 35;
      });

      if (nextCard) {
        const targetScroll = nextCard.offsetLeft - container.offsetLeft - 20;
        container.scrollTo({ left: Math.max(0, targetScroll), behavior: 'smooth' });
      } else {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      }
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!timer) {
                timer = setInterval(advanceSlide, interval);
                mobileCarouselTimers.push(timer);
              }
            } else {
              if (timer) {
                clearInterval(timer);
                mobileCarouselTimers = mobileCarouselTimers.filter((t) => t !== timer);
                timer = null;
              }
            }
          });
        },
        { threshold: 0.15 }
      );

      obs.observe(container);
      mobileCarouselObservers.push(obs);
    } else {
      timer = setInterval(advanceSlide, interval);
      mobileCarouselTimers.push(timer);
    }
  });
}

// Re-evaluate on window resize
window.addEventListener('resize', () => {
  initMobileCarousels();
}, { passive: true });

/* ==========================================================================
   4. SCROLL REVEALS (ONE-TIME ONLY ON INITIAL SCROLL DOWN)
   ========================================================================== */
function initBidirectionalScrollReveals() {
  const revealElements = document.querySelectorAll('.scroll-reveal-box');
  const panels = document.querySelectorAll('.community-display-stage, .lifestyle-stage, .panoramic-moment-card, .estate-hero-cinema-card');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const panelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          panelObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  panels.forEach((p) => panelObserver.observe(p));
}

/* ==========================================================================
   5. NAVIGATION ANCHOR SMOOTH SCROLLING
   ========================================================================== */
function initNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Mobile Sidebar Drawer Menu
  const drawer = document.getElementById('mobile-drawer');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  if (drawer && toggleBtn) {
    const openDrawer = () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    toggleBtn.addEventListener('click', () => {
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // Auto-close drawer when clicking on any link inside drawer
    drawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }
}

/* ==========================================================================
   6. CURRENCY CONVERSION & FORMATTING
   ========================================================================== */
function formatPrice(aedPrice, isRent = false) {
  const currInfo = EXCHANGE_RATES[state.currency] || EXCHANGE_RATES.AED;
  const converted = Math.round(aedPrice * currInfo.rate);
  
  let formatted = '';
  if (state.currency === 'AED') formatted = `AED ${converted.toLocaleString()}`;
  else if (state.currency === 'USD') formatted = `$${converted.toLocaleString()}`;
  else if (state.currency === 'EUR') formatted = `€${converted.toLocaleString()}`;
  else if (state.currency === 'GBP') formatted = `£${converted.toLocaleString()}`;

  if (isRent) formatted += ` <span style="font-size: 0.75rem; color: inherit; font-weight: 600;">/ yr</span>`;
  return formatted;
}

function initCurrencySelector() {
  const buttons = document.querySelectorAll('.currency-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.currency = btn.getAttribute('data-curr');
      
      const featuredPrice = document.querySelector('#featured-estate-card .sig-price');
      if (featuredPrice) {
        const aed = parseFloat(featuredPrice.getAttribute('data-price-aed'));
        if (!isNaN(aed)) featuredPrice.innerHTML = formatPrice(aed);
      }

      renderVisualCatalog();
      updateSovereignCalculator();
    });
  });
}

/* ==========================================================================
   7. VISUAL PROPERTY CATALOG
   ========================================================================== */
async function initVisualCatalog() {
  const categoryPills = document.querySelectorAll('.filter-pill');
  categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      categoryPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      state.category = pill.getAttribute('data-category');
      renderVisualCatalog();
    });
  });

  try {
    const liveProps = await getSignatureProperties();
    if (liveProps && liveProps.length > 0) {
      activeCatalogProperties = liveProps;
    }
  } catch (err) {
    console.warn('Using default signature properties cache:', err);
  }

  window.addEventListener('voe:properties-updated', async () => {
    try {
      const updated = await getSignatureProperties();
      if (updated && updated.length > 0) {
        activeCatalogProperties = updated;
        renderVisualCatalog();
      }
    } catch (e) {}
  });

  renderVisualCatalog();
}

function renderVisualCatalog() {
  const grid = document.getElementById('property-catalog-grid');
  if (!grid) return;

  let filtered = activeCatalogProperties.filter((p) => {
    if (state.category !== 'all' && p.category !== state.category) return false;
    return true;
  });

  grid.innerHTML = filtered.map((p) => `
    <article class="prop-card-visual scroll-reveal-box" data-estate-id="${p.id}">
      <div class="prop-media-wrap view-estate-btn" data-estate-id="${p.id}">
        <img src="${p.image || p.heroImage || p.coverImage || '/images/villa_exterior.jpg'}" alt="${p.title || p.name}" class="prop-img" loading="lazy" />
        <span class="prop-badge-top">${p.status || 'Exclusive Listing'}</span>
      </div>
      <div class="prop-body-compact">
        <div class="prop-loc-line">${p.location}</div>
        <h3 class="prop-name">${p.title || p.name}</h3>
        <div class="prop-quick-strip">
          <span>${p.bedrooms || '—'} Beds</span>
          <span>•</span>
          <span>${p.bathrooms || '—'} Baths</span>
          <span>•</span>
          <span>${(p.areaSqFt || p.size || 0).toLocaleString()} sq.ft</span>
        </div>
        <div class="prop-foot">
          <div class="prop-price-val">${formatPrice(p.priceAED || p.price, p.isRent)}</div>
          <button type="button" class="btn-inspect view-estate-btn" data-estate-id="${p.id}">
            Inspect
          </button>
        </div>
      </div>
    </article>
  `).join('');

  const newCards = grid.querySelectorAll('.scroll-reveal-box');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  newCards.forEach((c) => cardObserver.observe(c));

  attachEstateModalListeners();
  if (window.innerWidth <= 768) {
    initMobileCarousels();
  }
}

function attachEstateModalListeners() {
  document.querySelectorAll('.view-estate-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-estate-id');
      openPropertyModal(id);
    });
  });
}

/* ==========================================================================
   8. MODALS & FORMS
   ========================================================================== */
function initModals() {
  const propertyModal = document.getElementById('property-modal');
  const listModal = document.getElementById('list-estate-modal');
  const closePropertyBtn = document.getElementById('modal-close-btn');
  const closeListBtn = document.getElementById('list-modal-close-btn');
  const openListBtn = document.getElementById('open-list-modal');
  const ownerEnquiryBtn = document.getElementById('btn-owner-enquiry');

  if (closePropertyBtn) closePropertyBtn.addEventListener('click', () => closeModal(propertyModal));
  if (closeListBtn) closeListBtn.addEventListener('click', () => closeModal(listModal));
  if (openListBtn) openListBtn.addEventListener('click', () => openModal(listModal));
  if (ownerEnquiryBtn) ownerEnquiryBtn.addEventListener('click', () => openModal(listModal));

  window.addEventListener('click', (e) => {
    if (e.target === propertyModal) closeModal(propertyModal);
    if (e.target === listModal) closeModal(listModal);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(propertyModal);
      closeModal(listModal);
    }
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function openPropertyModal(estateId) {
  const estate = activeCatalogProperties.find((p) => p.id === estateId) || activeCatalogProperties[0] || PROPERTIES[0];
  const modalBody = document.getElementById('modal-content-body');
  const propertyModal = document.getElementById('property-modal');

  if (!estate || !modalBody) return;

  const galleryList = (estate.gallery && estate.gallery.length > 0) ? estate.gallery : [estate.image || estate.heroImage || '/images/villa_exterior.jpg'];
  const specs = estate.specs || {};

  modalBody.innerHTML = `
    <div class="modal-estate-layout">
      <div class="modal-gallery-main">
        <img id="modal-active-img" src="${galleryList[0]}" alt="${estate.title || estate.name}" class="modal-main-img" />
      </div>

      <div class="modal-gallery-thumbs">
        ${galleryList.map((imgSrc, idx) => `
          <img src="${imgSrc}" class="modal-thumb ${idx === 0 ? 'active' : ''}" data-full="${imgSrc}" alt="Gallery ${idx + 1}" />
        `).join('')}
      </div>

      <div class="modal-estate-body">
        <div>
          <h2 class="modal-estate-title">${estate.title || estate.name}</h2>
          <div class="modal-estate-location">${estate.location} • ${estate.type}</div>
          <div class="modal-estate-price">${formatPrice(estate.priceAED || estate.price, estate.isRent)}</div>
          <p class="modal-estate-desc">${estate.description || estate.overview || ''}</p>

          <table class="modal-specs-table">
            <tbody>
              <tr><td>Internal Area</td><td>${(estate.areaSqFt || estate.size || 0).toLocaleString()} sq.ft</td></tr>
              <tr><td>Bedrooms</td><td>${estate.bedrooms || '—'} En-Suite Bedrooms</td></tr>
              <tr><td>Plot / Subarea</td><td>${specs.plotSize || estate.area || 'Prime Location'}</td></tr>
              <tr><td>View Exposure</td><td>${specs.view || 'Panoramic Dubai Skyline'}</td></tr>
              <tr><td>Finishes</td><td>${specs.finishes || 'European Travertine & Marble'}</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <div class="modal-calculator-box">
            <h4 class="calc-title">Investment Overview</h4>
            
            <div style="margin-bottom: 12px;">
              <span class="calc-monthly-label">Estimated Monthly Financing</span>
              <span class="calc-monthly-val">${formatMonthlyFinancing(estate.priceAED || estate.price || 0)}</span>
            </div>

            <form id="modal-viewing-form" style="display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
              <input type="text" id="viewing-client-name" required placeholder="Your Name" style="padding: 10px; font-size: 0.8125rem; border: 1px solid var(--border-subtle); border-radius: 2px;" />
              <input type="tel" id="viewing-client-phone" required placeholder="Phone / WhatsApp" style="padding: 10px; font-size: 0.8125rem; border: 1px solid var(--border-subtle); border-radius: 2px;" />
              <button type="submit" class="btn-primary" id="btn-submit-chauffeur" style="width: 100%; padding: 12px; margin-top: 4px;">
                Request Chauffeur Viewing
              </button>
            </form>

            <div id="modal-viewing-success" style="display: none; padding: 14px; background: var(--bg-secondary); margin-top: 12px; text-align: center; border-radius: 2px; font-size: 0.8125rem;">
              <strong>Request Received</strong><br/>
              Our private desk will arrange your executive chauffeur itinerary.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const mainImg = document.getElementById('modal-active-img');
  const thumbs = modalBody.querySelectorAll('.modal-thumb');
  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      thumbs.forEach((t) => t.classList.remove('active'));
      thumb.classList.add('active');
      mainImg.src = thumb.getAttribute('data-full');
    });
  });

  const viewingForm = document.getElementById('modal-viewing-form');
  const viewingSuccess = document.getElementById('modal-viewing-success');
  if (viewingForm) {
    viewingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('viewing-client-name')?.value || '';
      const phone = document.getElementById('viewing-client-phone')?.value || '';
      
      try {
        await submitEnquiry({
          fullName: name,
          phone: phone,
          type: 'Chauffeur Viewing Request',
          propertyId: estate.id,
          propertyTitle: estate.title || estate.name,
          notes: `Chauffeur viewing request for ${estate.title || estate.name} (${estate.location}). Monthly estimate: ${formatMonthlyFinancing(estate.priceAED || estate.price)}`
        });
      } catch (err) {
        console.warn('Enquiry logged to local vault:', err);
      }

      viewingForm.style.display = 'none';
      if (viewingSuccess) viewingSuccess.style.display = 'block';
    });
  }

  openModal(propertyModal);
}

function formatMonthlyFinancing(totalAed) {
  const loanAed = totalAed * 0.8;
  const monthlyRate = 0.0425 / 12;
  const n = 300;
  const monthlyAed = (loanAed * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);

  const currInfo = EXCHANGE_RATES[state.currency] || EXCHANGE_RATES.AED;
  const converted = Math.round(monthlyAed * currInfo.rate);

  if (state.currency === 'AED') return `AED ${converted.toLocaleString()} /mo`;
  if (state.currency === 'USD') return `$${converted.toLocaleString()} /mo`;
  if (state.currency === 'EUR') return `€${converted.toLocaleString()} /mo`;
  if (state.currency === 'GBP') return `£${converted.toLocaleString()} /mo`;
  return `AED ${converted.toLocaleString()} /mo`;
}

function initForms() {
  const enquiryForm = document.getElementById('enquiry-form');
  const enquirySuccess = document.getElementById('enquiry-success');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const phone = document.getElementById('form-phone')?.value || '';
      const intentSelect = document.getElementById('form-intent');
      const intent = intentSelect ? intentSelect.options[intentSelect.selectedIndex].text : 'Private Acquisition';
      const notes = document.getElementById('form-notes')?.value || '';

      try {
        await submitEnquiry({
          fullName,
          email,
          phone,
          type: 'Private Acquisition Advisory',
          budget: intent,
          notes: notes
        });
      } catch (err) {
        console.warn('Enquiry stored in local vault:', err);
      }

      enquiryForm.style.display = 'none';
      if (enquirySuccess) enquirySuccess.style.display = 'block';
    });
  }

  const ownerForm = document.getElementById('owner-listing-form');
  const ownerSuccess = document.getElementById('owner-success-box');
  if (ownerForm) {
    ownerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('owner-name')?.value || '';
      const contact = document.getElementById('owner-contact')?.value || '';
      const community = document.getElementById('property-community')?.value || '';
      const estimatedPrice = document.getElementById('property-estimated-price')?.value || '';
      const notes = document.getElementById('property-notes')?.value || '';

      const isEmail = contact.includes('@');
      try {
        await submitEnquiry({
          fullName,
          email: isEmail ? contact : '',
          phone: !isEmail ? contact : '',
          type: 'Owner Estate Listing Submission',
          budget: estimatedPrice,
          propertyTitle: `${community} Estate`,
          notes: `Target Value: ${estimatedPrice}\nCommunity: ${community}\nNotes: ${notes}`
        });
      } catch (err) {
        console.warn('Owner listing stored in local vault:', err);
      }

      ownerForm.style.display = 'none';
      if (ownerSuccess) ownerSuccess.style.display = 'block';
    });
  }
}

/* ==========================================================================
   POST-HERO QUICK PROPERTY FILTER SEARCH PILL
   Interactive custom dropdowns & deep-link routing to /properties
   ========================================================================== */
function initHeroFilterSearch() {
  const form = document.getElementById('hero-filter-search-form');
  if (!form) return;

  const groups = form.querySelectorAll('.pill-field-group');

  const defaultLabels = {
    type: 'PROPERTY TYPE',
    bedrooms: 'BEDROOMS',
    price: 'PRICE RANGE',
    location: 'COMMUNITY'
  };

  function closeAllDropdowns() {
    groups.forEach(g => {
      g.classList.remove('is-open');
      const btn = g.querySelector('.pill-field-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }

  groups.forEach(group => {
    const fieldName = group.getAttribute('data-field');
    const btn = group.querySelector('.pill-field-btn');
    const hiddenInput = group.querySelector('input[type="hidden"]');
    const labelSpan = group.querySelector('.pill-btn-label');
    const options = group.querySelectorAll('.pill-dropdown-opt');

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = group.classList.contains('is-open');
        closeAllDropdowns();
        if (!isOpen) {
          group.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = opt.getAttribute('data-val');
        if (hiddenInput) hiddenInput.value = val;

        options.forEach(o => o.classList.remove('is-selected'));
        opt.classList.add('is-selected');

        if (labelSpan) {
          if (val === 'all') {
            labelSpan.textContent = defaultLabels[fieldName] || 'SELECT';
            btn.classList.remove('is-active');
          } else {
            labelSpan.textContent = opt.textContent.toUpperCase();
            btn.classList.add('is-active');
          }
        }

        closeAllDropdowns();
      });
    });
  });

  // Close when clicking outside form
  document.addEventListener('click', (e) => {
    if (!form.contains(e.target)) {
      closeAllDropdowns();
    }
  });

  // Close when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });

  // Handle Form Submission -> Navigate to /properties
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const typeVal = document.getElementById('input-search-type')?.value || 'all';
    const bedsVal = document.getElementById('input-search-beds')?.value || 'all';
    const priceVal = document.getElementById('input-search-price')?.value || 'all';
    const locVal = document.getElementById('input-search-location')?.value || 'all';

    const params = new URLSearchParams();
    if (typeVal && typeVal !== 'all') params.set('type', typeVal);
    if (bedsVal && bedsVal !== 'all') params.set('bedrooms', bedsVal);
    if (priceVal && priceVal !== 'all') params.set('price', priceVal);
    if (locVal && locVal !== 'all') params.set('location', locVal);

    const qs = params.toString();
    window.location.href = qs ? `/properties?${qs}` : '/properties';
  });
}

