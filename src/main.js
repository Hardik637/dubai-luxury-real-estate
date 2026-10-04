import { HeroScrollEngine } from './hero-scroll.js';
import { PROPERTIES, EXCHANGE_RATES } from './properties-data.js';

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
  initHeroScroll();
  initNavigation();
  initAmbientAudio();
  initCurrencySelector();
  initMasterCommunities();
  initCraftsmanshipLab();
  initLifestyleCarousel();
  initSovereignCalculator();
  initBidirectionalScrollReveals();
  initVisualCatalog();
  initMobileCarousels();
  initModals();
  initForms();
});

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
  };

  new HeroScrollEngine({
    containerSelector: '#hero-scroll-container',
    canvasSelector: '#hero-canvas',
    totalFrames: 147,
    framePath: (num) => `/hero-frames/frame_${String(num).padStart(4, '0')}.webp`,
    onProgress: (progress) => {
      updateNavbarState();
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
   3. MASTER COMMUNITIES SWITCHER & AUTO-CAROUSEL (SOBHA-STYLE LIVING ENCLAVES)
   ========================================================================== */
let currentCommKey = 'forest';

function initMasterCommunities() {
  const stage = document.getElementById('community-stage');
  const bgImg = document.getElementById('comm-bg-img');
  const badge = document.getElementById('comm-badge');
  const title = document.getElementById('comm-title');
  const desc = document.getElementById('comm-desc');
  const features = document.getElementById('comm-features');
  const exploreBtn = document.getElementById('comm-explore-btn');
  const prevBtn = document.getElementById('comm-prev-btn');
  const nextBtn = document.getElementById('comm-next-btn');
  const zonePrev = document.getElementById('comm-zone-prev');
  const zoneNext = document.getElementById('comm-zone-next');
  const indicators = stage ? stage.querySelectorAll('.comm-indicators .indicator-bar') : [];

  // Blueprint Elements
  const atmosphereView = document.getElementById('comm-atmosphere-view');
  const blueprintView = document.getElementById('comm-blueprint-view');
  const blueprintTitle = document.getElementById('comm-blueprint-title');
  const blueprintGrid = document.getElementById('comm-blueprint-grid');
  const modeAtmosphereBtn = document.getElementById('mode-atmosphere-btn');
  const modeBlueprintBtn = document.getElementById('mode-blueprint-btn');

  const commKeys = ['forest', 'island', 'harbour', 'dunes', 'sky'];
  let isHovered = false;
  let isInView = true;

  function renderBlueprint(commKey) {
    const data = MASTER_COMMUNITIES[commKey];
    if (!data || !data.blueprint) return;
    if (blueprintTitle) blueprintTitle.textContent = data.blueprint.title;
    if (blueprintGrid) {
      blueprintGrid.innerHTML = data.blueprint.stats.map(s => `
        <div class="blueprint-stat">
          <span class="blueprint-val">${s.val}</span>
          <span class="blueprint-lbl">${s.lbl}</span>
        </div>
      `).join('');
    }
  }

  // Dual View Mode Switcher (Atmosphere vs Blueprint)
  if (modeAtmosphereBtn && modeBlueprintBtn) {
    modeAtmosphereBtn.addEventListener('click', () => {
      modeAtmosphereBtn.classList.add('active');
      modeBlueprintBtn.classList.remove('active');
      if (atmosphereView) atmosphereView.style.display = 'block';
      if (blueprintView) blueprintView.style.display = 'none';
      updateCommIndicators(currentCommKey);
    });

    modeBlueprintBtn.addEventListener('click', () => {
      modeBlueprintBtn.classList.add('active');
      modeAtmosphereBtn.classList.remove('active');
      if (atmosphereView) atmosphereView.style.display = 'none';
      if (blueprintView) blueprintView.style.display = 'block';
      renderBlueprint(currentCommKey);
      updateCommIndicators(currentCommKey);
    });
  }

  function updateCommIndicators(targetKey) {
    const idx = commKeys.indexOf(targetKey);
    if (idx === -1) return;

    indicators.forEach((ind, i) => {
      const fill = ind.querySelector('.loading-fill');
      if (i < idx) {
        ind.classList.remove('active');
        ind.classList.add('completed');
        if (fill) fill.style.animation = 'none';
      } else if (i === idx) {
        ind.classList.remove('completed');
        ind.classList.add('active');
        if (fill) {
          fill.style.animation = 'none';
          void fill.offsetWidth; // Force CSS reflow to re-trigger 3s animation
          fill.style.animation = '';
        }
      } else {
        ind.classList.remove('active', 'completed');
        if (fill) fill.style.animation = 'none';
      }
    });

    const activeInd = indicators[idx];
    const activeFill = activeInd ? activeInd.querySelector('.loading-fill') : null;
    if (activeFill) {
      activeFill.onanimationend = null;
      activeFill.onanimationend = () => {
        if (!isHovered && isInView) {
          nextCommunity();
        }
      };
    }
  }

  function switchCommunity(targetKey) {
    if (!MASTER_COMMUNITIES[targetKey]) return;
    currentCommKey = targetKey;

    const data = MASTER_COMMUNITIES[currentCommKey];
    if (!data || !bgImg) return;

    bgImg.style.opacity = '0.2';
    bgImg.style.transform = 'scale(1.08)';

    setTimeout(() => {
      bgImg.src = data.image;
      if (badge) badge.textContent = data.badge;
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      if (features) features.innerHTML = data.features.map(f => `<span>${f}</span>`).join(' • ');
      if (exploreBtn) exploreBtn.setAttribute('data-estate-id', data.estateId);

      renderBlueprint(currentCommKey);

      bgImg.style.opacity = '1';
      bgImg.style.transform = 'scale(1)';
    }, 280);

    updateCommIndicators(currentCommKey);
  }

  function nextCommunity() {
    const idx = commKeys.indexOf(currentCommKey);
    const nextIdx = (idx + 1) % commKeys.length;
    switchCommunity(commKeys[nextIdx]);
  }

  function prevCommunity() {
    const idx = commKeys.indexOf(currentCommKey);
    const prevIdx = (idx - 1 + commKeys.length) % commKeys.length;
    switchCommunity(commKeys[prevIdx]);
  }

  // Navigation Arrows & Hitbox Zones
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevCommunity();
    });
  }
  if (zonePrev) {
    zonePrev.addEventListener('click', (e) => {
      if (e.target !== prevBtn && !prevBtn.contains(e.target)) {
        prevCommunity();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextCommunity();
    });
  }
  if (zoneNext) {
    zoneNext.addEventListener('click', (e) => {
      if (e.target !== nextBtn && !nextBtn.contains(e.target)) {
        nextCommunity();
      }
    });
  }

  // Direct Click on Story Loading Bars
  indicators.forEach((ind) => {
    ind.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(ind.getAttribute('data-index'), 10);
      if (!isNaN(idx) && commKeys[idx]) {
        switchCommunity(commKeys[idx]);
      }
    });
  });

  // Pause on hover
  if (stage) {
    stage.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    stage.addEventListener('mouseleave', () => {
      isHovered = false;
      // If animation had ended or reached near 100% while hovered
      const activeIdx = commKeys.indexOf(currentCommKey);
      const activeFill = indicators[activeIdx]?.querySelector('.loading-fill');
      if (activeFill) {
        const computed = window.getComputedStyle(activeFill);
        const curW = parseFloat(computed.width);
        const parentW = activeFill.parentElement.offsetWidth;
        if (parentW > 0 && curW >= parentW - 1) {
          nextCommunity();
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
      setTimeout(() => { isHovered = false; }, 2500);
      if (e.changedTouches && e.changedTouches.length > 0) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) {
            nextCommunity();
          } else {
            prevCommunity();
          }
        }
      }
    }, { passive: true });

    // Only run when section is visible in viewport
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
  }

  // Initialize indicators for initial community
  updateCommIndicators(currentCommKey);
}

/* ==========================================================================
   3.1 CRAFTSMANSHIP PILLARS SHOWCASE (SOBHA "CONCEPT TO COMPLETION")
   ========================================================================== */
function initCraftsmanshipLab() {
  // Handled declaratively with Sobha-inspired 4-pillar showcase grid & mobile carousel
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
   3.2 SOVEREIGN WEALTH & YIELD CALCULATOR
   ========================================================================== */
let currentCalculatorBudgetAED = 25000000;

function updateSovereignCalculator() {
  const displayBudget = document.getElementById('calc-display-budget');
  const displayTax = document.getElementById('calc-tax-saved');
  const displayYield = document.getElementById('calc-net-yield');
  const displayVisa = document.getElementById('calc-visa-status');

  const currInfo = EXCHANGE_RATES[state.currency] || EXCHANGE_RATES.AED;
  const rate = currInfo.rate;
  const curr = state.currency;

  const convertedBudget = Math.round(currentCalculatorBudgetAED * rate);
  const taxSaved = Math.round(currentCalculatorBudgetAED * 0.084 * 0.45 * rate);
  const netYield = Math.round(currentCalculatorBudgetAED * 0.082 * rate);

  const formatCurr = (val) => {
    if (curr === 'AED') return `AED ${val.toLocaleString()}`;
    if (curr === 'USD') return `$${val.toLocaleString()}`;
    if (curr === 'EUR') return `€${val.toLocaleString()}`;
    if (curr === 'GBP') return `£${val.toLocaleString()}`;
    return `${val.toLocaleString()} ${curr}`;
  };

  if (displayBudget) displayBudget.textContent = formatCurr(convertedBudget);
  if (displayTax) displayTax.textContent = formatCurr(taxSaved);
  if (displayYield) displayYield.textContent = formatCurr(netYield);
  if (displayVisa) {
    if (currentCalculatorBudgetAED >= 2000000) {
      displayVisa.textContent = "100% Qualified";
    } else {
      displayVisa.textContent = "Partial (2M AED min)";
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

function initMobileCarousels() {
  // Clear any existing timers first
  mobileCarouselTimers.forEach((t) => clearInterval(t));
  mobileCarouselTimers = [];

  // STRICT GUARD: DO NOTHING ON PC/DESKTOP VIEW
  if (window.innerWidth > 768) return;

  const carouselTargets = [
    { sel: '.heritage-stats-grid', interval: 3800 },
    { sel: '.sobha-pillars-grid', interval: 4200 },
    { sel: '.sovereign-pillars-grid', interval: 3600 },
    { sel: '.calc-results-grid', interval: 4000 },
    { sel: '.visual-cinema-grid', interval: 4400 }
  ];

  carouselTargets.forEach(({ sel, interval }) => {
    const container = document.querySelector(sel);
    if (!container) return;

    let isInteracting = false;
    let resumeTimeout = null;

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

    // Auto-advance loop
    const timer = setInterval(() => {
      if (window.innerWidth > 768 || isInteracting) return;

      const firstChild = container.firstElementChild;
      if (!firstChild) return;

      const cardWidth = firstChild.offsetWidth + 14;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 15) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, interval);

    mobileCarouselTimers.push(timer);
  });
}

// Re-evaluate on window resize
window.addEventListener('resize', () => {
  initMobileCarousels();
}, { passive: true });

/* ==========================================================================
   4. PROMINENT BIDIRECTIONAL SCROLL REVEALS
   ========================================================================== */
function initBidirectionalScrollReveals() {
  const revealElements = document.querySelectorAll('.scroll-reveal-box');
  const panels = document.querySelectorAll('.community-display-stage, .lifestyle-stage, .panoramic-moment-card, .estate-hero-cinema-card');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          entry.target.classList.remove('is-revealed');
        }
      });
    },
    {
      root: null,
      rootMargin: '-30px 0px -30px 0px',
      threshold: 0.15
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const panelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
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
function initVisualCatalog() {
  const categoryPills = document.querySelectorAll('.filter-pill');
  categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      categoryPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      state.category = pill.getAttribute('data-category');
      renderVisualCatalog();
    });
  });

  renderVisualCatalog();
}

function renderVisualCatalog() {
  const grid = document.getElementById('property-catalog-grid');
  if (!grid) return;

  let filtered = PROPERTIES.filter((p) => {
    if (state.category !== 'all' && p.category !== state.category) return false;
    return true;
  });

  grid.innerHTML = filtered.map((p) => `
    <article class="prop-card-visual scroll-reveal-box" data-estate-id="${p.id}">
      <div class="prop-media-wrap view-estate-btn" data-estate-id="${p.id}">
        <img src="${p.image}" alt="${p.title}" class="prop-img" loading="lazy" />
        <span class="prop-badge-top">${p.status}</span>
      </div>
      <div class="prop-body-compact">
        <div class="prop-loc-line">${p.location}</div>
        <h3 class="prop-name">${p.title}</h3>
        <div class="prop-quick-strip">
          <span>${p.bedrooms} Beds</span>
          <span>•</span>
          <span>${p.bathrooms} Baths</span>
          <span>•</span>
          <span>${p.areaSqFt.toLocaleString()} sq.ft</span>
        </div>
        <div class="prop-foot">
          <div class="prop-price-val">${formatPrice(p.priceAED, p.isRent)}</div>
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
      } else {
        entry.target.classList.remove('is-revealed');
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
  const estate = PROPERTIES.find((p) => p.id === estateId) || PROPERTIES[0];
  const modalBody = document.getElementById('modal-content-body');
  const propertyModal = document.getElementById('property-modal');

  if (!estate || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-estate-layout">
      <div class="modal-gallery-main">
        <img id="modal-active-img" src="${estate.gallery[0] || estate.image}" alt="${estate.title}" class="modal-main-img" />
      </div>

      <div class="modal-gallery-thumbs">
        ${estate.gallery.map((imgSrc, idx) => `
          <img src="${imgSrc}" class="modal-thumb ${idx === 0 ? 'active' : ''}" data-full="${imgSrc}" alt="Gallery ${idx + 1}" />
        `).join('')}
      </div>

      <div class="modal-estate-body">
        <div>
          <h2 class="modal-estate-title">${estate.title}</h2>
          <div class="modal-estate-location">${estate.location} • ${estate.type}</div>
          <div class="modal-estate-price">${formatPrice(estate.priceAED, estate.isRent)}</div>
          <p class="modal-estate-desc">${estate.description}</p>

          <table class="modal-specs-table">
            <tbody>
              <tr><td>Internal Area</td><td>${estate.areaSqFt.toLocaleString()} sq.ft (${estate.areaSqM.toLocaleString()} sq.m)</td></tr>
              <tr><td>Bedrooms</td><td>${estate.bedrooms} En-Suite Bedrooms</td></tr>
              <tr><td>Plot Size</td><td>${estate.specs.plotSize}</td></tr>
              <tr><td>View Exposure</td><td>${estate.specs.view}</td></tr>
              <tr><td>Finishes</td><td>${estate.specs.finishes}</td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <div class="modal-calculator-box">
            <h4 class="calc-title">Investment Overview</h4>
            
            <div style="margin-bottom: 12px;">
              <span class="calc-monthly-label">Estimated Monthly Financing</span>
              <span class="calc-monthly-val">${formatMonthlyFinancing(estate.priceAED)}</span>
            </div>

            <form id="modal-viewing-form" style="display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
              <input type="text" required placeholder="Your Name" style="padding: 10px; font-size: 0.8125rem; border: 1px solid var(--border-subtle); border-radius: 2px;" />
              <input type="tel" required placeholder="Phone / WhatsApp" style="padding: 10px; font-size: 0.8125rem; border: 1px solid var(--border-subtle); border-radius: 2px;" />
              <button type="submit" class="btn-primary" style="width: 100%; padding: 12px; margin-top: 4px;">
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
    viewingForm.addEventListener('submit', (e) => {
      e.preventDefault();
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
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      enquiryForm.style.display = 'none';
      if (enquirySuccess) enquirySuccess.style.display = 'block';
    });
  }

  const ownerForm = document.getElementById('owner-listing-form');
  const ownerSuccess = document.getElementById('owner-success-box');
  if (ownerForm) {
    ownerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      ownerForm.style.display = 'none';
      if (ownerSuccess) ownerSuccess.style.display = 'block';
    });
  }
}
