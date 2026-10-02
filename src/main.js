import { HeroScrollEngine } from './hero-scroll.js';
import { PROPERTIES, EXCHANGE_RATES } from './properties-data.js';

// State management
let state = {
  currency: 'AED',
  category: 'all'
};

// 24 Hours Daylight Moments
const DAYLIGHT_MOMENTS = {
  dawn: {
    image: "/images/morning_light.jpg",
    tag: "06:30 • DAWN ON WATER • PALM FRONDS",
    quote: "“Waking to quiet ripples against your private wooden jetty as the city rests in pastel haze.”",
    meta: "24°C Morning Breeze • Barefoot Shoreline"
  },
  midday: {
    image: "/images/villa_exterior.jpg",
    tag: "13:15 • SHADED ARCHITECTURE • EMIRATES HILLS",
    quote: "“Cool Roman travertine corridors, gentle palm shadows, and an endless infinity pool reflecting the sky.”",
    meta: "31°C Midday Sun • Climatized Seclusion"
  },
  sunset: {
    image: "/images/desert_sunset.jpg",
    tag: "18:45 • DUNE AMBER • DESERT HORIZON",
    quote: "“Sunken travertine fire lounge wrapped by rolling golden dunes, where silence is the greatest luxury.”",
    meta: "28°C Amber Twilight • Firepit Glow"
  },
  twilight: {
    image: "/images/twilight_terrace.jpg",
    tag: "21:30 • SKYLINE TWILIGHT • DOWNTOWN DUBAI",
    quote: "“Candlelit rooftop terrace gatherings with the illuminated silhouette of the Burj Khalifa floating above.”",
    meta: "26°C Evening Breeze • City Lights"
  }
};

// District Visual Panoramas
const DISTRICT_DATA = {
  palm: {
    image: "/images/villa_exterior.jpg",
    name: "THE ISLAND COASTLINE • PALM JUMEIRAH",
    desc: "Tranquil water-centric living. Step barefoot onto calm white sand, enjoy morning boat departures, and unwind to unhurried sunset tides."
  },
  downtown: {
    image: "/images/twilight_terrace.jpg",
    name: "THE DOWNTOWN HORIZON • DIFC",
    desc: "Cosmopolitan grandeur in the sky. Direct pedestrian access to Michelin-starred dining, opera, art galleries, and 360-degree skyline views."
  },
  desert: {
    image: "/images/desert_sunset.jpg",
    name: "THE OASIS & SANCTUARY • EMIRATES HILLS",
    desc: "Expansive private acreages framed by ancient olive groves, natural bio-ponds, and total acoustic tranquility."
  },
  harbour: {
    image: "/images/yacht_lifestyle.jpg",
    name: "THE MARITIME RIVIERA • DUBAI HARBOUR",
    desc: "Mediterranean nautical elegance. Deepwater superyacht slips, coastal breeze, and sunset sailing into the open Arabian Gulf."
  }
};

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initHeroScroll();
  initNavigation();
  initCurrencySelector();
  initDaylightCycle();
  initInteractiveTilt();
  initVisualCatalog();
  initDistrictPanorama();
  initModals();
  initForms();
});

/* ==========================================================================
   1. HERO SCROLL ENGINE
   ========================================================================== */
function initHeroScroll() {
  const navbar = document.getElementById('main-navbar');
  const heroContainer = document.getElementById('hero-scroll-container');

  new HeroScrollEngine({
    containerSelector: '#hero-scroll-container',
    canvasSelector: '#hero-canvas',
    totalFrames: 147,
    framePath: (num) => `/hero-frames/frame_${String(num).padStart(4, '0')}.webp`,
    onProgress: (progress) => {
      // Reveal navbar ONLY after scrolling through the hero sequence
      if (progress >= 0.90) {
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
      }
    }
  });

  window.addEventListener('scroll', () => {
    const heroRect = heroContainer.getBoundingClientRect();
    if (heroRect.bottom <= window.innerHeight + 50) {
      navbar.classList.add('visible');
    }
  }, { passive: true });
}

/* ==========================================================================
   2. NAVIGATION & SMOOTH SCROLLING
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
   3. DAYLIGHT CYCLE (24 HOURS IN DUBAI)
   ========================================================================== */
function initDaylightCycle() {
  const stepButtons = document.querySelectorAll('.cycle-step-btn');
  const stageImg = document.getElementById('stage-bg-image');
  const stageTag = document.getElementById('stage-tag');
  const stageQuote = document.getElementById('stage-quote');
  const stageMeta = document.getElementById('stage-meta');

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      stepButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const timeKey = btn.getAttribute('data-time');
      const data = DAYLIGHT_MOMENTS[timeKey];
      if (!data || !stageImg) return;

      // Smooth cross-fade animation
      stageImg.style.opacity = '0.3';
      stageImg.style.transform = 'scale(1.05)';

      setTimeout(() => {
        stageImg.src = data.image;
        stageTag.textContent = data.tag;
        stageQuote.textContent = data.quote;
        stageMeta.textContent = data.meta;
        stageImg.style.opacity = '1';
        stageImg.style.transform = 'scale(1)';
      }, 300);
    });
  });
}

/* ==========================================================================
   4. INTERACTIVE MOUSE PARALLAX TILT
   ========================================================================== */
function initInteractiveTilt() {
  const tiltItems = document.querySelectorAll('.interactive-tilt');
  
  tiltItems.forEach((item) => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      item.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-4px)`;
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   5. VISUAL PROPERTY CATALOG
   ========================================================================== */
function formatPrice(aedPrice, isRent = false) {
  const currInfo = EXCHANGE_RATES[state.currency] || EXCHANGE_RATES.AED;
  const converted = Math.round(aedPrice * currInfo.rate);
  
  let formatted = '';
  if (state.currency === 'AED') formatted = `AED ${converted.toLocaleString()}`;
  else if (state.currency === 'USD') formatted = `$${converted.toLocaleString()}`;
  else if (state.currency === 'EUR') formatted = `€${converted.toLocaleString()}`;
  else if (state.currency === 'GBP') formatted = `£${converted.toLocaleString()}`;

  if (isRent) formatted += ` <span style="font-size: 0.75rem; color: var(--text-muted);">/ yr</span>`;
  return formatted;
}

function initCurrencySelector() {
  const buttons = document.querySelectorAll('.currency-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.currency = btn.getAttribute('data-curr');
      
      // Update featured card
      const featuredPrice = document.querySelector('#featured-estate-card .sig-price');
      if (featuredPrice) {
        const aed = parseFloat(featuredPrice.getAttribute('data-price-aed'));
        if (!isNaN(aed)) featuredPrice.innerHTML = formatPrice(aed);
      }

      renderVisualCatalog();
    });
  });
}

function initVisualCatalog() {
  // Category tabs
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
    <article class="prop-card-visual" data-estate-id="${p.id}">
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

  attachEstateModalListeners();
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
   6. DISTRICT PANORAMA SWITCHER
   ========================================================================== */
function initDistrictPanorama() {
  const districtBtns = document.querySelectorAll('.district-btn');
  const districtImg = document.getElementById('district-img');
  const districtName = document.getElementById('district-name');
  const districtDesc = document.getElementById('district-desc');

  districtBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      districtBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const districtKey = btn.getAttribute('data-district');
      const data = DISTRICT_DATA[districtKey];
      if (!data || !districtImg) return;

      districtImg.style.opacity = '0.3';
      districtImg.style.transform = 'scale(1.04)';

      setTimeout(() => {
        districtImg.src = data.image;
        districtName.textContent = data.name;
        districtDesc.textContent = data.desc;
        districtImg.style.opacity = '1';
        districtImg.style.transform = 'scale(1)';
      }, 300);
    });
  });
}

/* ==========================================================================
   7. MODALS (PROPERTY DETAILS & OWNER LISTING)
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
              <button type="submit" class="btn-dark" style="width: 100%; padding: 12px;">
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

  // Setup gallery thumbnail clicks
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

/* ==========================================================================
   8. FORM HANDLERS
   ========================================================================== */
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
