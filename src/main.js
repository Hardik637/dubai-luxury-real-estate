import { HeroScrollEngine } from './hero-scroll.js';
import { PROPERTIES, EXCHANGE_RATES } from './properties-data.js';

let state = {
  currency: 'AED',
  category: 'all'
};

document.addEventListener('DOMContentLoaded', () => {
  initHeroScroll();
  initNavigation();
  initCurrencySelector();
  initBidirectionalScrollReveals();
  initVisualCatalog();
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
      if (progress >= 0.88) {
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
   2. PROMINENT BIDIRECTIONAL SCROLL REVEALS
   Triggers dynamically when scrolling DOWN and UP both!
   ========================================================================== */
function initBidirectionalScrollReveals() {
  const revealElements = document.querySelectorAll('.scroll-reveal-box');
  const actPanels = document.querySelectorAll('.cinematic-act-panel');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // Remove class when scrolling out so it re-animates in both directions
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

  // Background slow zoom push-in observer (bidirectional)
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
    {
      threshold: 0.1
    }
  );

  actPanels.forEach((panel) => panelObserver.observe(panel));
}

/* ==========================================================================
   3. NAVIGATION ANCHOR SMOOTH SCROLLING
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
   4. CURRENCY CONVERSION & FORMATTING
   ========================================================================== */
function formatPrice(aedPrice, isRent = false) {
  const currInfo = EXCHANGE_RATES[state.currency] || EXCHANGE_RATES.AED;
  const converted = Math.round(aedPrice * currInfo.rate);
  
  let formatted = '';
  if (state.currency === 'AED') formatted = `AED ${converted.toLocaleString()}`;
  else if (state.currency === 'USD') formatted = `$${converted.toLocaleString()}`;
  else if (state.currency === 'EUR') formatted = `€${converted.toLocaleString()}`;
  else if (state.currency === 'GBP') formatted = `£${converted.toLocaleString()}`;

  if (isRent) formatted += ` <span style="font-size: 0.75rem; color: #DDD5C9;">/ yr</span>`;
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

/* ==========================================================================
   5. VISUAL PROPERTY CATALOG
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

  // Attach observer to new property cards
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
   6. MODALS
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

/* ==========================================================================
   7. FORM HANDLERS
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
