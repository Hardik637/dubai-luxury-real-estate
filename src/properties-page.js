import { 
  DEMO_PROPERTIES, 
  getPropertyById, 
  filterProperties, 
  formatCurrencyAED 
} from './data/properties.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarAndDrawer();
  initPropertiesRoute();
});

// Navigation Bar & Mobile Drawer for Inner Pages
function initNavbarAndDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
}

// State for Filtering & Lightbox
const filterState = {
  transaction: 'all',
  location: 'all',
  type: 'all',
  bedrooms: 'all',
  priceRange: 'all',
  sort: 'default'
};

let activeGalleryImages = [];
let activeLightboxIndex = 0;

function initPropertiesRoute() {
  // Check if URL has a specific property ID
  // e.g. /properties/palm-residence or /properties?id=palm-residence or hash #palm-residence
  checkCurrentRoute();

  // Listen for browser forward/back buttons
  window.addEventListener('popstate', () => {
    checkCurrentRoute();
  });

  // Setup Catalog UI & Filter Events
  setupFilterControls();
  setupMobileFilterModal();
  setupInquiryModal();
}

function checkCurrentRoute() {
  const path = window.location.pathname.replace(/\/+$/, '');
  const urlParams = new URLSearchParams(window.location.search);
  const queryId = urlParams.get('id');
  const hashId = window.location.hash.replace(/^#/, '');

  let propertyId = null;

  if (queryId) {
    propertyId = queryId;
  } else if (hashId && DEMO_PROPERTIES.some(p => p.id === hashId)) {
    propertyId = hashId;
  } else if (path.includes('/properties/')) {
    const segments = path.split('/properties/');
    if (segments[1] && segments[1].trim() !== '') {
      propertyId = segments[1].trim().toLowerCase();
    }
  }

  if (propertyId) {
    const prop = getPropertyById(propertyId);
    if (prop) {
      showPropertyDetailView(prop);
      return;
    }
  }

  // Otherwise show standard catalog view
  showCatalogView();
}

function showCatalogView() {
  const catalogView = document.getElementById('properties-catalog-view');
  const detailView = document.getElementById('property-detail-view');

  if (catalogView) catalogView.style.display = 'block';
  if (detailView) {
    detailView.style.display = 'none';
    detailView.innerHTML = '';
  }

  renderPropertiesGrid();
}

function showPropertyDetailView(prop) {
  const catalogView = document.getElementById('properties-catalog-view');
  const detailView = document.getElementById('property-detail-view');

  if (catalogView) catalogView.style.display = 'none';
  if (detailView) {
    detailView.style.display = 'block';
    renderPropertyDetailHTML(prop, detailView);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateToProperty(propId) {
  const prop = getPropertyById(propId);
  if (!prop) return;

  // Use pushState to create clean full-page route
  const targetUrl = `/properties/${prop.id}`;
  try {
    window.history.pushState({ propId: prop.id }, '', targetUrl);
  } catch (e) {
    window.location.hash = prop.id;
  }

  showPropertyDetailView(prop);
}

function navigateBackToCatalog() {
  try {
    window.history.pushState(null, '', '/properties');
  } catch (e) {
    window.location.hash = '';
  }
  showCatalogView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --------------------------------------------------------------------------
// CATALOG GRID RENDERING & FILTERING
// --------------------------------------------------------------------------
function renderPropertiesGrid() {
  const gridContainer = document.getElementById('properties-cards-grid');
  const countPill = document.getElementById('results-count-pill');
  if (!gridContainer) return;

  const filtered = filterProperties(filterState);

  if (countPill) {
    countPill.textContent = `${filtered.length} Residence${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    gridContainer.innerHTML = `
      <div class="empty-properties-box" style="grid-column: 1 / -1;">
        <h4 class="empty-title">No Matching Residences Found</h4>
        <p class="empty-desc">Try expanding your search parameters or reset filters to explore our full portfolio.</p>
        <button type="button" class="btn-primary-luxury" id="btn-empty-reset">Reset All Filters</button>
      </div>
    `;
    const emptyReset = document.getElementById('btn-empty-reset');
    if (emptyReset) {
      emptyReset.addEventListener('click', resetAllFilters);
    }
    return;
  }

  gridContainer.innerHTML = filtered.map(prop => `
    <article class="property-editorial-card" data-id="${prop.id}">
      <div class="card-media-wrapper">
        <img 
          src="${prop.coverImage || prop.images.exterior[0]}" 
          alt="${prop.name} — ${prop.location}" 
          class="card-property-img" 
          loading="lazy"
        />
        <span class="card-subtle-badge">
          ${prop.transaction === 'rent' ? 'FOR RENT' : 'FOR SALE'}
        </span>
      </div>
      <div class="card-details-panel">
        <h3 class="card-property-name">${prop.name}</h3>
        <p class="card-property-location">${prop.location}</p>
        <div class="card-property-price">${prop.priceDisplay}</div>
      </div>
    </article>
  `).join('');

  // Attach card click handlers
  gridContainer.querySelectorAll('.property-editorial-card').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const id = card.getAttribute('data-id');
      navigateToProperty(id);
    });
  });
}

function setupFilterControls() {
  // Transaction Toggle (BUY / RENT)
  const txnPills = document.querySelectorAll('.txn-pill-btn');
  txnPills.forEach(pill => {
    pill.addEventListener('click', () => {
      txnPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterState.transaction = pill.getAttribute('data-txn');
      updatePriceRangeDropdown();
      renderPropertiesGrid();
    });
  });

  // Location Select
  const locSelect = document.getElementById('filter-location-select');
  if (locSelect) {
    locSelect.addEventListener('change', (e) => {
      filterState.location = e.target.value;
      renderPropertiesGrid();
    });
  }

  // Type Select
  const typeSelect = document.getElementById('filter-type-select');
  if (typeSelect) {
    typeSelect.addEventListener('change', (e) => {
      filterState.type = e.target.value;
      renderPropertiesGrid();
    });
  }

  // Bedroom Select
  const bedSelect = document.getElementById('filter-beds-select');
  if (bedSelect) {
    bedSelect.addEventListener('change', (e) => {
      filterState.bedrooms = e.target.value;
      renderPropertiesGrid();
    });
  }

  // Price Select
  const priceSelect = document.getElementById('filter-price-select');
  if (priceSelect) {
    priceSelect.addEventListener('change', (e) => {
      filterState.priceRange = e.target.value;
      renderPropertiesGrid();
    });
  }

  // Reset Filters Button
  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllFilters);
  }
}

function updatePriceRangeDropdown() {
  const priceSelect = document.getElementById('filter-price-select');
  const sheetPriceSelect = document.getElementById('sheet-price-select');

  const isRent = filterState.transaction === 'rent';

  const optionsHTML = isRent ? `
    <option value="all">Price: All</option>
    <option value="under-200k">Under AED 200,000 / yr</option>
    <option value="200k-350k">AED 200,000 – 350,000 / yr</option>
    <option value="350k-500k">AED 350,000 – 500,000 / yr</option>
    <option value="500k-plus">AED 500,000+ / yr</option>
  ` : `
    <option value="all">Price: All</option>
    <option value="under-5m">Under AED 5,000,000</option>
    <option value="5m-10m">AED 5,000,000 – 10,000,000</option>
    <option value="10m-20m">AED 10,000,000 – 20,000,000</option>
    <option value="20m-plus">AED 20,000,000+</option>
  `;

  if (priceSelect) {
    priceSelect.innerHTML = optionsHTML;
    priceSelect.value = 'all';
  }
  if (sheetPriceSelect) {
    sheetPriceSelect.innerHTML = optionsHTML;
    sheetPriceSelect.value = 'all';
  }
  filterState.priceRange = 'all';
}

function resetAllFilters() {
  filterState.transaction = 'all';
  filterState.location = 'all';
  filterState.type = 'all';
  filterState.bedrooms = 'all';
  filterState.priceRange = 'all';
  filterState.sort = 'default';

  // Reset UI elements
  document.querySelectorAll('.txn-pill-btn').forEach(p => {
    if (p.getAttribute('data-txn') === 'all') p.classList.add('active');
    else p.classList.remove('active');
  });

  const locSelect = document.getElementById('filter-location-select');
  if (locSelect) locSelect.value = 'all';

  const typeSelect = document.getElementById('filter-type-select');
  if (typeSelect) typeSelect.value = 'all';

  const bedSelect = document.getElementById('filter-beds-select');
  if (bedSelect) bedSelect.value = 'all';

  updatePriceRangeDropdown();
  renderPropertiesGrid();
}

function setupMobileFilterModal() {
  const triggerBtn = document.getElementById('mobile-filter-trigger');
  const modal = document.getElementById('mobile-filter-modal');
  const closeBtn = document.getElementById('mobile-filter-close');
  const applyBtn = document.getElementById('mobile-filter-apply');

  if (triggerBtn && modal) {
    triggerBtn.addEventListener('click', () => {
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const sheetLoc = document.getElementById('sheet-location-select');
      const sheetType = document.getElementById('sheet-type-select');
      const sheetBed = document.getElementById('sheet-beds-select');
      const sheetPrice = document.getElementById('sheet-price-select');

      if (sheetLoc) filterState.location = sheetLoc.value;
      if (sheetType) filterState.type = sheetType.value;
      if (sheetBed) filterState.bedrooms = sheetBed.value;
      if (sheetPrice) filterState.priceRange = sheetPrice.value;

      closeModal();
      renderPropertiesGrid();
    });
  }
}

// --------------------------------------------------------------------------
// FULL-PAGE PROPERTY DETAIL RENDERING & INTERACTIONS
// --------------------------------------------------------------------------
function renderPropertyDetailHTML(prop, container) {
  const allImages = collectAllImages(prop);
  activeGalleryImages = allImages;
  activeLightboxIndex = 0;

  container.innerHTML = `
    <!-- Back to Collection Navigation Bar -->
    <div class="detail-nav-strip">
      <button type="button" class="btn-back-catalog" id="btn-back-to-catalog">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        Back to Collection
      </button>
      <div class="results-count-pill">${prop.area}</div>
    </div>

    <!-- Property Detail Hero -->
    <section class="detail-hero-section">
      <img src="${prop.coverImage || prop.images.exterior[0]}" alt="${prop.name}" class="detail-hero-img" />
      <div class="detail-hero-overlay">
        <div class="detail-hero-content">
          <div class="detail-hero-meta">
            <div class="detail-hero-badges">
              <span class="detail-badge-pill">${prop.transaction === 'rent' ? 'FOR RENT' : 'FOR SALE'}</span>
              <span class="detail-badge-pill">${prop.type}</span>
            </div>
            <h1 class="detail-prop-title">${prop.name}</h1>
            <p class="detail-prop-loc">${prop.location} • ${prop.area}</p>
            <div class="detail-prop-price">${prop.priceDisplay}</div>
          </div>
          <div class="detail-hero-actions">
            <button type="button" class="btn-viewing-hero" id="hero-viewing-btn" data-prop-name="${prop.name}">
              Arrange a Viewing
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Specs Summary Strip -->
    <div class="detail-specs-strip">
      <div class="specs-strip-inner">
        <div class="spec-item">
          <div class="spec-item-val">${prop.bedrooms}</div>
          <div class="spec-item-lbl">Bedrooms</div>
        </div>
        <div class="spec-item">
          <div class="spec-item-val">${prop.bathrooms}</div>
          <div class="spec-item-lbl">Bathrooms</div>
        </div>
        <div class="spec-item">
          <div class="spec-item-val">${prop.sizeDisplay}</div>
          <div class="spec-item-lbl">Total Area</div>
        </div>
        <div class="spec-item">
          <div class="spec-item-val">${prop.highlights[0] || 'Private Terrace'}</div>
          <div class="spec-item-lbl">Key Feature</div>
        </div>
        <div class="spec-item">
          <div class="spec-item-val">${prop.highlights[1] || 'Covered Parking'}</div>
          <div class="spec-item-lbl">Exclusive Amenity</div>
        </div>
      </div>
    </div>

    <!-- Categorized Image Gallery -->
    <section class="gallery-section">
      <div class="gallery-inner">
        <div class="gallery-header-row">
          <h3 class="sheet-title">Residence Gallery</h3>
          <div class="gallery-tabs-nav" id="gallery-tabs-nav">
            <button type="button" class="gallery-tab-btn active" data-cat="all">ALL</button>
            <button type="button" class="gallery-tab-btn" data-cat="exterior">EXTERIOR</button>
            <button type="button" class="gallery-tab-btn" data-cat="living">LIVING</button>
            <button type="button" class="gallery-tab-btn" data-cat="bedrooms">BEDROOMS</button>
            <button type="button" class="gallery-tab-btn" data-cat="kitchen">KITCHEN</button>
            <button type="button" class="gallery-tab-btn" data-cat="bathrooms">BATHROOMS</button>
            <button type="button" class="gallery-tab-btn" data-cat="amenities">AMENITIES</button>
          </div>
        </div>

        <div class="gallery-masonry-grid" id="gallery-masonry-grid">
          <!-- Populated by filterGalleryCategory -->
        </div>
      </div>
    </section>

    <!-- Property Details & Overview -->
    <section class="detail-content-layout">
      <div class="detail-overview-block">
        <h3>Overview</h3>
        <p class="detail-overview-desc">${prop.overview || prop.description}</p>
        <p class="detail-overview-desc">${prop.description}</p>

        <h3 style="margin-top: 48px;">Curated Amenities</h3>
        <div class="detail-amenities-tags">
          ${prop.amenities.map(a => `<span class="amenity-chip">${a}</span>`).join('')}
        </div>
      </div>

      <div class="detail-specs-block">
        <h3>Property Details</h3>
        <table class="specs-table">
          <tbody>
            ${Object.entries(prop.specs).map(([key, val]) => `
              <tr>
                <td>${key}</td>
                <td>${val}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>

    <!-- Location Landmarks Section -->
    <section class="detail-location-section">
      <div class="detail-location-inner">
        <div class="detail-location-block">
          <h3>Strategic Location</h3>
          <p class="detail-prop-loc">${prop.location} • Prime Connectivity</p>
          <div class="location-landmarks-grid">
            ${prop.locationHighlights.map(item => `
              <div class="location-landmark-card">
                <div class="landmark-time">${item.time}</div>
                <div class="landmark-name">${item.landmark}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom Viewing CTA -->
    <section class="detail-bottom-cta">
      <h2 class="cta-large-heading">Ready to see it in person?</h2>
      <button type="button" class="btn-primary-luxury" id="bottom-viewing-btn" data-prop-name="${prop.name}">
        Arrange a Private Viewing
      </button>
    </section>
  `;

  // Attach Back Button Handler
  const backBtn = document.getElementById('btn-back-to-catalog');
  if (backBtn) {
    backBtn.addEventListener('click', navigateBackToCatalog);
  }

  // Setup Gallery Category Tabs
  renderGalleryGrid('all', prop);
  const tabButtons = container.querySelectorAll('.gallery-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      renderGalleryGrid(cat, prop);
    });
  });

  // Attach Viewing Buttons to Inquiry Modal
  const heroViewingBtn = document.getElementById('hero-viewing-btn');
  const bottomViewingBtn = document.getElementById('bottom-viewing-btn');
  if (heroViewingBtn) heroViewingBtn.addEventListener('click', () => openInquiryModal(prop.name));
  if (bottomViewingBtn) bottomViewingBtn.addEventListener('click', () => openInquiryModal(prop.name));
}

function collectAllImages(prop) {
  const images = [];
  const cats = ['exterior', 'living', 'bedrooms', 'kitchen', 'bathrooms', 'amenities'];
  cats.forEach(cat => {
    if (prop.images && prop.images[cat] && Array.isArray(prop.images[cat])) {
      prop.images[cat].forEach(url => {
        if (!images.includes(url)) images.push(url);
      });
    }
  });
  if (images.length === 0 && prop.coverImage) images.push(prop.coverImage);
  return images;
}

function renderGalleryGrid(category, prop) {
  const grid = document.getElementById('gallery-masonry-grid');
  if (!grid) return;

  let list = [];
  if (category === 'all') {
    list = collectAllImages(prop);
  } else if (prop.images && prop.images[category]) {
    list = prop.images[category];
  }

  if (list.length === 0) {
    list = collectAllImages(prop);
  }

  activeGalleryImages = list;

  grid.innerHTML = list.map((imgUrl, idx) => `
    <div class="gallery-thumb-item" data-index="${idx}">
      <img src="${imgUrl}" alt="${prop.name} ${category}" class="gallery-thumb-img" loading="lazy" />
      <div class="gallery-item-hover-overlay">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="11" y1="8" x2="11" y2="14"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-thumb-item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-index'), 10);
      openLightbox(idx);
    });
  });
}

// --------------------------------------------------------------------------
// LIGHTBOX MODAL WITH TOUCH SWIPE & ARROWS
// --------------------------------------------------------------------------
function setupLightboxModal() {
  let modal = document.getElementById('lightbox-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <button type="button" class="lightbox-close-btn" id="lightbox-close-btn" aria-label="Close Lightbox">✕</button>
      <button type="button" class="lightbox-nav-btn lightbox-prev-btn" id="lightbox-prev-btn" aria-label="Previous Image">‹</button>
      <button type="button" class="lightbox-nav-btn lightbox-next-btn" id="lightbox-next-btn" aria-label="Next Image">›</button>
      <div class="lightbox-main-content">
        <img src="" alt="Property View" class="lightbox-active-img" id="lightbox-active-img" />
        <div class="lightbox-caption-bar" id="lightbox-caption-bar"></div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('lightbox-close-btn');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', prevLightboxImage);
    if (nextBtn) nextBtn.addEventListener('click', nextLightboxImage);

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevLightboxImage();
      if (e.key === 'ArrowRight') nextLightboxImage();
    });

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 50;
      if (touchEndX < touchStartX - threshold) {
        nextLightboxImage(); // Swiped left -> next
      } else if (touchEndX > touchStartX + threshold) {
        prevLightboxImage(); // Swiped right -> prev
      }
    }
  }
}

function openLightbox(index) {
  setupLightboxModal();
  const modal = document.getElementById('lightbox-modal');
  if (!modal || activeGalleryImages.length === 0) return;

  activeLightboxIndex = index;
  updateLightboxContent();
  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function nextLightboxImage() {
  if (activeGalleryImages.length === 0) return;
  activeLightboxIndex = (activeLightboxIndex + 1) % activeGalleryImages.length;
  updateLightboxContent();
}

function prevLightboxImage() {
  if (activeGalleryImages.length === 0) return;
  activeLightboxIndex = (activeLightboxIndex - 1 + activeGalleryImages.length) % activeGalleryImages.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const imgEl = document.getElementById('lightbox-active-img');
  const captionEl = document.getElementById('lightbox-caption-bar');
  if (!imgEl) return;

  const currentUrl = activeGalleryImages[activeLightboxIndex];
  imgEl.src = currentUrl;

  if (captionEl) {
    captionEl.textContent = `${activeLightboxIndex + 1} of ${activeGalleryImages.length}`;
  }
}

// --------------------------------------------------------------------------
// VIEWING / INQUIRY MODAL
// --------------------------------------------------------------------------
function setupInquiryModal() {
  let modal = document.getElementById('viewing-inquiry-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'viewing-inquiry-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-medium">
        <button type="button" class="modal-close-btn" id="inquiry-close-btn" aria-label="Close modal">✕</button>
        <div class="modal-content modal-padded">
          <span class="visual-eyebrow">Private Placement</span>
          <h3 class="modal-title" id="inquiry-modal-title">Arrange a Private Viewing</h3>
          <p class="modal-desc" id="inquiry-modal-desc">
            Coordinate an exclusive on-site or virtual architectural walkthrough with our senior advisory team.
          </p>
          <form id="viewing-request-form" class="minimal-clean-form">
            <input type="hidden" id="inquiry-prop-input" value="" />
            <div class="form-row-compact">
              <input type="text" id="inquiry-name" required placeholder="Full Name" />
              <input type="text" id="inquiry-contact" required placeholder="Email or Phone / WhatsApp" />
            </div>
            <div class="form-row-compact">
              <input type="text" id="inquiry-date" placeholder="Preferred Date / Window" />
              <input type="text" id="inquiry-type" placeholder="On-Site / Live Video Tour" />
            </div>
            <textarea id="inquiry-notes" rows="3" placeholder="Specific requirements or private concierge notes..."></textarea>
            <button type="submit" class="btn-dark btn-submit-full" id="inquiry-submit-btn">
              Submit Viewing Request
            </button>
          </form>
          <div id="inquiry-success-box" class="form-success-box" style="display: none; margin-top: 20px;">
            <h4>Viewing Request Received</h4>
            <p>Our private office has registered your request. An executive partner will reach out to confirm your itinerary.</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('inquiry-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closeInquiryModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeInquiryModal();
    });

    const form = document.getElementById('viewing-request-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const successBox = document.getElementById('inquiry-success-box');
        if (successBox) successBox.style.display = 'block';
        form.style.display = 'none';
      });
    }
  }
}

function openInquiryModal(propertyName) {
  setupInquiryModal();
  const modal = document.getElementById('viewing-inquiry-modal');
  const title = document.getElementById('inquiry-modal-title');
  const input = document.getElementById('inquiry-prop-input');
  const form = document.getElementById('viewing-request-form');
  const successBox = document.getElementById('inquiry-success-box');

  if (title) title.textContent = `Viewing: ${propertyName || 'Private Residence'}`;
  if (input) input.value = propertyName || '';
  if (form) form.style.display = 'block';
  if (successBox) successBox.style.display = 'none';

  if (modal) {
    modal.classList.add('is-open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closeInquiryModal() {
  const modal = document.getElementById('viewing-inquiry-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}
