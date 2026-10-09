import {
  loginAdmin,
  isAuthenticated,
  getCurrentAdmin,
  logoutAdmin
} from './services/auth.js';
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  exportEnquiriesToCSV
} from './services/enquiries.js';
import {
  getProperties,
  saveProperty,
  togglePropertySignature,
  deleteProperty
} from './services/properties.js';

/**
 * Vision of Excellence — Admin Portal & Owner Console Controller
 */

// State
let allEnquiries = [];
let allProperties = [];
let activeTab = 'enquiries';

// DOM Elements
const viewLogin = document.getElementById('view-login');
const viewDashboard = document.getElementById('view-dashboard');
const authActions = document.getElementById('auth-actions');
const adminUserDisplay = document.getElementById('admin-user-display');
const btnLogout = document.getElementById('btn-admin-logout');
const loginForm = document.getElementById('admin-login-form');
const loginFeedback = document.getElementById('login-feedback');
const btnSubmitLogin = document.getElementById('btn-submit-login');
const btnTogglePwd = document.getElementById('btn-toggle-pwd');
const loginPasswordInput = document.getElementById('login-password');

// Tab Buttons & Panels
const tabBtnEnquiries = document.getElementById('tab-btn-enquiries');
const tabBtnProperties = document.getElementById('tab-btn-properties');
const panelEnquiries = document.getElementById('panel-enquiries');
const panelProperties = document.getElementById('panel-properties');

// Enquiries Controls
const enquiriesList = document.getElementById('enquiries-list');
const searchEnquiriesInput = document.getElementById('search-enquiries');
const filterEnquiryStatus = document.getElementById('filter-enquiry-status');
const btnExportCsv = document.getElementById('btn-export-csv');
const btnRefreshEnquiries = document.getElementById('btn-refresh-enquiries');

// Properties Controls
const propertiesGrid = document.getElementById('properties-grid');
const searchPropsInput = document.getElementById('search-properties');
const filterPropCategory = document.getElementById('filter-property-category');
const filterPropSig = document.getElementById('filter-property-signature');
const btnOpenAddProperty = document.getElementById('btn-open-add-property');

// Modal Elements
const modalPropEditor = document.getElementById('modal-property-editor');
const formPropEditor = document.getElementById('property-editor-form');
const btnClosePropModal = document.getElementById('btn-close-prop-modal');
const btnCancelPropEdit = document.getElementById('btn-cancel-prop-edit');
const propModalTitle = document.getElementById('prop-modal-title');

/* ==========================================================================
   INITIALIZATION & AUTH CHECK
   ========================================================================== */
function init() {
  setupAuthEvents();
  setupTabEvents();
  setupEnquiryEvents();
  setupPropertyEvents();
  setupModalEvents();

  if (isAuthenticated()) {
    showDashboard();
  } else {
    showLogin();
  }
}

function showLogin() {
  viewLogin.style.display = 'flex';
  viewDashboard.style.display = 'none';
  authActions.style.display = 'none';
  loginFeedback.className = 'login-feedback';
  loginFeedback.style.display = 'none';
}

async function showDashboard() {
  const admin = getCurrentAdmin();
  if (admin && admin.email) {
    adminUserDisplay.textContent = admin.email;
  }
  viewLogin.style.display = 'none';
  viewDashboard.style.display = 'block';
  authActions.style.display = 'flex';

  await Promise.all([
    loadEnquiries(),
    loadProperties()
  ]);
}

/* ==========================================================================
   AUTH CONTROLLER
   ========================================================================== */
function setupAuthEvents() {
  // Password Visibility Toggle
  if (btnTogglePwd && loginPasswordInput) {
    btnTogglePwd.addEventListener('click', () => {
      const isPassword = loginPasswordInput.type === 'password';
      loginPasswordInput.type = isPassword ? 'text' : 'password';
      btnTogglePwd.textContent = isPassword ? 'Hide' : 'Show';
    });
  }

  // Login Form Submit
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      loginFeedback.style.display = 'none';
      btnSubmitLogin.disabled = true;
      btnSubmitLogin.textContent = 'Verifying credentials...';

      const email = document.getElementById('login-email').value;
      const password = loginPasswordInput.value;

      try {
        await loginAdmin(email, password);
        showDashboard();
      } catch (err) {
        loginFeedback.textContent = err.message || 'Authentication failed. Please verify credentials.';
        loginFeedback.className = 'login-feedback error';
        loginFeedback.style.display = 'block';
      } finally {
        btnSubmitLogin.disabled = false;
        btnSubmitLogin.textContent = 'Verify & Enter Console';
      }
    });
  }

  // Logout
  if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
      await logoutAdmin();
      showLogin();
    });
  }
}

/* ==========================================================================
   TAB NAVIGATION
   ========================================================================== */
function setupTabEvents() {
  tabBtnEnquiries.addEventListener('click', () => switchTab('enquiries'));
  tabBtnProperties.addEventListener('click', () => switchTab('properties'));
}

function switchTab(tab) {
  activeTab = tab;
  if (tab === 'enquiries') {
    tabBtnEnquiries.classList.add('active');
    tabBtnEnquiries.setAttribute('aria-selected', 'true');
    tabBtnProperties.classList.remove('active');
    tabBtnProperties.setAttribute('aria-selected', 'false');

    panelEnquiries.style.display = 'block';
    panelProperties.style.display = 'none';
  } else {
    tabBtnProperties.classList.add('active');
    tabBtnProperties.setAttribute('aria-selected', 'true');
    tabBtnEnquiries.classList.remove('active');
    tabBtnEnquiries.setAttribute('aria-selected', 'false');

    panelProperties.style.display = 'block';
    panelEnquiries.style.display = 'none';
  }
}

/* ==========================================================================
   TAB 1: CLIENT ENQUIRIES CONTROLLER
   ========================================================================== */
function setupEnquiryEvents() {
  if (searchEnquiriesInput) {
    searchEnquiriesInput.addEventListener('input', () => renderEnquiries());
  }
  if (filterEnquiryStatus) {
    filterEnquiryStatus.addEventListener('change', () => renderEnquiries());
  }
  if (btnRefreshEnquiries) {
    btnRefreshEnquiries.addEventListener('click', () => loadEnquiries());
  }
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => exportEnquiriesToCSV());
  }
}

async function loadEnquiries() {
  try {
    allEnquiries = await getEnquiries();
    updateEnquiriesMetrics();
    renderEnquiries();
  } catch (err) {
    console.error('Failed to load enquiries:', err);
  }
}

function updateEnquiriesMetrics() {
  const total = allEnquiries.length;
  const newLeads = allEnquiries.filter(e => e.status === 'new').length;
  const highVal = allEnquiries.filter(e => {
    const b = (e.budget || '').toLowerCase();
    return b.includes('10m') || b.includes('15m') || b.includes('25m') || b.includes('acquisition');
  }).length;
  const contacted = allEnquiries.filter(e => e.status === 'contacted' || e.status === 'qualified').length;

  document.getElementById('metric-total-enquiries').textContent = total;
  document.getElementById('metric-new-enquiries').textContent = newLeads;
  document.getElementById('metric-high-value-enquiries').textContent = highVal;
  document.getElementById('metric-contacted-enquiries').textContent = contacted;
  document.getElementById('badge-enquiries-count').textContent = newLeads > 0 ? `${newLeads} new` : total;
}

function renderEnquiries() {
  if (!enquiriesList) return;

  const query = (searchEnquiriesInput.value || '').trim().toLowerCase();
  const statusFilter = filterEnquiryStatus.value;

  const filtered = allEnquiries.filter(e => {
    // Status filter
    if (statusFilter !== 'all' && e.status !== statusFilter) return false;

    // Search query
    if (query) {
      const matchName = (e.fullName || '').toLowerCase().includes(query);
      const matchEmail = (e.email || '').toLowerCase().includes(query);
      const matchPhone = (e.phone || '').toLowerCase().includes(query);
      const matchProp = (e.propertyTitle || '').toLowerCase().includes(query);
      const matchNotes = (e.notes || '').toLowerCase().includes(query);
      return matchName || matchEmail || matchPhone || matchProp || matchNotes;
    }
    return true;
  });

  if (filtered.length === 0) {
    enquiriesList.innerHTML = `
      <div class="admin-empty-state">
        <h3>No Enquiries Found</h3>
        <p>No client requests match your active filters.</p>
      </div>
    `;
    return;
  }

  enquiriesList.innerHTML = filtered.map(e => {
    const dateStr = e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }) : 'Recent';

    const cleanPhone = (e.phone || '').replace(/[^0-9]/g, '');
    const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : null;
    const telLink = e.phone ? `tel:${e.phone}` : null;
    const mailLink = e.email ? `mailto:${e.email}?subject=Private%20Advisory%20Follow-up%20—%20Vision%20of%20Excellence` : null;

    return `
      <article class="enquiry-card" data-id="${e.id}">
        <div class="enquiry-card-top">
          <div class="enquiry-client-meta">
            <div class="enquiry-client-name">
              ${escapeHtml(e.fullName || 'Anonymous Principal')}
              <span class="enquiry-type-tag">${escapeHtml(e.type || 'Private Request')}</span>
            </div>
            <div class="enquiry-contacts-strip">
              ${e.email ? `<span>✉ <a href="${mailLink}">${escapeHtml(e.email)}</a></span>` : ''}
              ${e.phone ? `<span>☎ <a href="${telLink}">${escapeHtml(e.phone)}</a></span>` : ''}
              ${e.budget ? `<span>✦ Budget: <strong>${escapeHtml(e.budget)}</strong></span>` : ''}
            </div>
          </div>
          <div class="enquiry-time-status">
            <span class="enquiry-timestamp">${dateStr}</span>
            <select class="status-badge-select" data-action="update-status" data-id="${e.id}">
              <option value="new" ${e.status === 'new' ? 'selected' : ''}>NEW LEAD</option>
              <option value="contacted" ${e.status === 'contacted' ? 'selected' : ''}>CONTACTED</option>
              <option value="qualified" ${e.status === 'qualified' ? 'selected' : ''}>QUALIFIED</option>
              <option value="archived" ${e.status === 'archived' ? 'selected' : ''}>ARCHIVED</option>
            </select>
          </div>
        </div>

        ${e.propertyTitle || e.notes ? `
          <div class="enquiry-body-details">
            ${e.propertyTitle ? `
              <div class="enquiry-prop-ref">Residence: ${escapeHtml(e.propertyTitle)}</div>
            ` : ''}
            ${e.notes ? `
              <div class="enquiry-notes-content">${escapeHtml(e.notes)}</div>
            ` : ''}
          </div>
        ` : ''}

        <div class="enquiry-card-bottom">
          <div class="enquiry-action-cluster">
            ${waLink ? `
              <a href="${waLink}" target="_blank" rel="noopener" class="btn-contact-quick" title="Message client on WhatsApp">
                💬 WhatsApp
              </a>
            ` : ''}
            ${telLink ? `
              <a href="${telLink}" class="btn-contact-quick" title="Place direct phone call">
                📞 Call
              </a>
            ` : ''}
            ${mailLink ? `
              <a href="${mailLink}" class="btn-contact-quick" title="Send email">
                ✉ Email
              </a>
            ` : ''}
          </div>
          <button type="button" class="btn-delete-ghost" data-action="delete-enquiry" data-id="${e.id}" title="Remove enquiry">
            Delete Record
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach enquiry card listeners
  enquiriesList.querySelectorAll('[data-action="update-status"]').forEach(select => {
    select.addEventListener('change', async (e) => {
      const id = select.getAttribute('data-id');
      const newStatus = select.value;
      await updateEnquiryStatus(id, newStatus);
      await loadEnquiries();
    });
  });

  enquiriesList.querySelectorAll('[data-action="delete-enquiry"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to delete this enquiry record?')) {
        await deleteEnquiry(id);
        await loadEnquiries();
      }
    });
  });
}

/* ==========================================================================
   TAB 2: PROPERTY PORTFOLIO CONTROLLER
   ========================================================================== */
function setupPropertyEvents() {
  if (searchPropsInput) {
    searchPropsInput.addEventListener('input', () => renderProperties());
  }
  if (filterPropCategory) {
    filterPropCategory.addEventListener('change', () => renderProperties());
  }
  if (filterPropSig) {
    filterPropSig.addEventListener('change', () => renderProperties());
  }

  if (btnOpenAddProperty) {
    btnOpenAddProperty.addEventListener('click', () => openPropertyModal());
  }
}

async function loadProperties() {
  try {
    allProperties = await getProperties();
    updatePropertiesMetrics();
    renderProperties();
  } catch (err) {
    console.error('Failed to load properties:', err);
  }
}

function updatePropertiesMetrics() {
  const total = allProperties.length;
  const signature = allProperties.filter(p => p.isSignature === true).length;
  const privatePlacements = allProperties.filter(p => (p.status || '').toLowerCase().includes('private')).length;
  const lease = allProperties.filter(p => p.category === 'rent' || p.isRent === true).length;

  document.getElementById('metric-total-props').textContent = total;
  document.getElementById('metric-sig-props').textContent = signature;
  document.getElementById('metric-private-props').textContent = privatePlacements;
  document.getElementById('metric-lease-props').textContent = lease;
  document.getElementById('badge-properties-count').textContent = total;
}

function renderProperties() {
  if (!propertiesGrid) return;

  const query = (searchPropsInput.value || '').trim().toLowerCase();
  const categoryFilter = filterPropCategory.value;
  const sigFilter = filterPropSig.value;

  const filtered = allProperties.filter(p => {
    // Category filter
    if (categoryFilter !== 'all') {
      const isRent = p.category === 'rent' || p.isRent === true;
      if (categoryFilter === 'rent' && !isRent) return false;
      if (categoryFilter === 'sale' && isRent) return false;
    }

    // Signature filter
    if (sigFilter === 'signature' && !p.isSignature) return false;
    if (sigFilter === 'standard' && p.isSignature) return false;

    // Search query
    if (query) {
      const matchTitle = (p.title || p.name || '').toLowerCase().includes(query);
      const matchLoc = (p.location || '').toLowerCase().includes(query);
      const matchType = (p.type || '').toLowerCase().includes(query);
      return matchTitle || matchLoc || matchType;
    }
    return true;
  });

  if (filtered.length === 0) {
    propertiesGrid.innerHTML = `
      <div class="admin-empty-state" style="grid-column: 1 / -1;">
        <h3>No Residences Found</h3>
        <p>No listings match your filter criteria.</p>
      </div>
    `;
    return;
  }

  propertiesGrid.innerHTML = filtered.map(p => {
    const priceFormatted = Number(p.priceAED || p.price || 0).toLocaleString();
    const isRent = p.category === 'rent' || p.isRent === true;
    const isSig = Boolean(p.isSignature);

    return `
      <article class="prop-admin-card" data-id="${p.id}">
        <div class="prop-admin-media">
          <img src="${escapeHtml(p.image || p.heroImage || p.coverImage || '/images/villa_exterior.jpg')}" alt="${escapeHtml(p.title || p.name)}" class="prop-admin-img" loading="lazy" />
          <span class="prop-admin-status-overlay">${escapeHtml(p.status || 'Active Listing')}</span>
        </div>

        <!-- HOMEPAGE SIGNATURE RESIDENCE TOGGLE -->
        <div class="signature-toggle-bar">
          <span class="sig-toggle-label ${isSig ? 'active' : ''}">
            ${isSig ? '★ Featured on Homepage' : 'Standard Catalog Only'}
          </span>
          <label class="switch-control" title="Toggle Homepage Presence">
            <input type="checkbox" class="prop-sig-switch" data-id="${p.id}" ${isSig ? 'checked' : ''} />
            <span class="switch-slider"></span>
          </label>
        </div>

        <div class="prop-admin-body">
          <div class="prop-admin-loc">${escapeHtml(p.location || 'Dubai')} • ${escapeHtml(p.type || 'Residence')}</div>
          <h3 class="prop-admin-title">${escapeHtml(p.title || p.name)}</h3>
          
          <div class="prop-admin-specs-row">
            <span>${p.bedrooms || '—'} Beds</span>
            <span>•</span>
            <span>${p.bathrooms || '—'} Baths</span>
            <span>•</span>
            <span>${(p.areaSqFt || p.size || 0).toLocaleString()} sq.ft</span>
          </div>

          <div class="prop-admin-price">
            AED ${priceFormatted} ${isRent ? '<span style="font-size: 0.75rem; color: var(--admin-text-dim);">/ year</span>' : ''}
          </div>
        </div>

        <div class="prop-admin-footer">
          <button type="button" class="btn-card-edit" data-action="edit-prop" data-id="${p.id}">
            Edit Details
          </button>
          <button type="button" class="btn-delete-ghost" data-action="delete-prop" data-id="${p.id}">
            Remove Listing
          </button>
        </div>
      </article>
    `;
  }).join('');

  // Attach toggle listeners
  propertiesGrid.querySelectorAll('.prop-sig-switch').forEach(toggle => {
    toggle.addEventListener('change', async () => {
      const id = toggle.getAttribute('data-id');
      await togglePropertySignature(id);
      await loadProperties();
    });
  });

  // Attach edit listeners
  propertiesGrid.querySelectorAll('[data-action="edit-prop"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const prop = allProperties.find(p => p.id === id);
      if (prop) openPropertyModal(prop);
    });
  });

  // Attach delete listeners
  propertiesGrid.querySelectorAll('[data-action="delete-prop"]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Are you sure you want to remove this property listing from the website?')) {
        await deleteProperty(id);
        await loadProperties();
      }
    });
  });
}

/* ==========================================================================
   PHOTO UPLOAD & PROPERTY EDITOR MODAL (ADD / EDIT)
   ========================================================================== */
let currentCoverImage = '';
let currentGalleryImages = [];

function optimizeImageFile(file, maxWidth = 1600, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Please select a valid image file.'));
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function setCoverImagePreview(url) {
  currentCoverImage = url;
  const container = document.getElementById('cover-preview-container');
  const imgEl = document.getElementById('cover-preview-img');
  const hiddenInput = document.getElementById('edit-image');

  if (url && container && imgEl) {
    imgEl.src = url;
    container.style.display = 'block';
    if (hiddenInput) hiddenInput.value = url;
  } else if (container && hiddenInput) {
    container.style.display = 'none';
    hiddenInput.value = '';
    currentCoverImage = '';
  }
}

function renderGalleryPreviews() {
  const container = document.getElementById('gallery-previews-container');
  const hiddenInput = document.getElementById('edit-gallery');
  if (!container) return;

  if (currentGalleryImages.length === 0) {
    container.innerHTML = '';
    if (hiddenInput) hiddenInput.value = '';
    return;
  }

  if (hiddenInput) hiddenInput.value = currentGalleryImages.join(', ');

  container.innerHTML = currentGalleryImages.map((imgUrl, idx) => `
    <div class="gallery-preview-item" data-idx="${idx}">
      <img src="${escapeHtml(imgUrl)}" alt="Gallery View ${idx + 1}" class="gallery-preview-img" />
      <button type="button" class="btn-remove-preview" data-remove-gallery="${idx}" title="Remove photo">✕</button>
    </div>
  `).join('');

  container.querySelectorAll('[data-remove-gallery]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-remove-gallery'), 10);
      currentGalleryImages.splice(idx, 1);
      renderGalleryPreviews();
    });
  });
}

function setupModalEvents() {
  if (btnClosePropModal) btnClosePropModal.addEventListener('click', closePropertyModal);
  if (btnCancelPropEdit) btnCancelPropEdit.addEventListener('click', closePropertyModal);

  modalPropEditor.addEventListener('click', (e) => {
    if (e.target === modalPropEditor) closePropertyModal();
  });

  // Cover Photo File Upload
  const coverFileInput = document.getElementById('edit-cover-file');
  const coverZone = document.getElementById('zone-cover-upload');
  const btnRemoveCover = document.getElementById('btn-remove-cover');

  if (coverFileInput) {
    coverFileInput.addEventListener('change', async (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        try {
          const optimized = await optimizeImageFile(file);
          setCoverImagePreview(optimized);
        } catch (err) {
          alert('Could not process photo: ' + err.message);
        }
      }
    });
  }

  if (btnRemoveCover) {
    btnRemoveCover.addEventListener('click', () => {
      setCoverImagePreview('');
      if (coverFileInput) coverFileInput.value = '';
    });
  }

  // Cover Drag and Drop
  if (coverZone) {
    coverZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      coverZone.classList.add('dragover');
    });
    coverZone.addEventListener('dragleave', () => {
      coverZone.classList.remove('dragover');
    });
    coverZone.addEventListener('drop', async (e) => {
      e.preventDefault();
      coverZone.classList.remove('dragover');
      const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (file) {
        try {
          const optimized = await optimizeImageFile(file);
          setCoverImagePreview(optimized);
        } catch (err) {
          alert('Could not process photo: ' + err.message);
        }
      }
    });
  }

  // Gallery Multiple Photos File Upload
  const galleryFileInput = document.getElementById('edit-gallery-files');
  const galleryZone = document.getElementById('zone-gallery-upload');

  if (galleryFileInput) {
    galleryFileInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      for (const file of files) {
        try {
          const optimized = await optimizeImageFile(file);
          currentGalleryImages.push(optimized);
        } catch (err) {
          console.warn('Skipped invalid gallery image:', err);
        }
      }
      renderGalleryPreviews();
      galleryFileInput.value = '';
    });
  }

  if (galleryZone) {
    galleryZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      galleryZone.classList.add('dragover');
    });
    galleryZone.addEventListener('dragleave', () => {
      galleryZone.classList.remove('dragover');
    });
    galleryZone.addEventListener('drop', async (e) => {
      e.preventDefault();
      galleryZone.classList.remove('dragover');
      const files = Array.from(e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files : []);
      for (const file of files) {
        try {
          const optimized = await optimizeImageFile(file);
          currentGalleryImages.push(optimized);
        } catch (err) {
          console.warn('Skipped invalid gallery image:', err);
        }
      }
      renderGalleryPreviews();
    });
  }

  // Preset quick buttons
  document.querySelectorAll('.preset-chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const url = btn.getAttribute('data-url');
      setCoverImagePreview(url);
    });
  });

  // Form submit
  if (formPropEditor) {
    formPropEditor.addEventListener('submit', async (e) => {
      e.preventDefault();

      const id = document.getElementById('edit-prop-id').value;
      const title = document.getElementById('edit-title').value.trim();
      const location = document.getElementById('edit-location').value.trim();
      const type = document.getElementById('edit-type').value;
      const category = document.getElementById('edit-category').value;
      const status = document.getElementById('edit-status').value;
      const price = parseFloat(document.getElementById('edit-price').value) || 0;
      const bedrooms = parseInt(document.getElementById('edit-bedrooms').value, 10) || 0;
      const bathrooms = parseInt(document.getElementById('edit-bathrooms').value, 10) || 0;
      const areaSqFt = parseFloat(document.getElementById('edit-area').value) || 0;
      const subarea = document.getElementById('edit-subarea').value.trim();
      
      const image = currentCoverImage || document.getElementById('edit-image').value.trim() || '/images/villa_exterior.jpg';
      const gallery = currentGalleryImages.length > 0 ? currentGalleryImages : [image];

      const tagline = document.getElementById('edit-tagline').value.trim();
      const desc = document.getElementById('edit-desc').value.trim();
      const amenitiesRaw = document.getElementById('edit-amenities').value.trim();
      const isSignature = document.getElementById('edit-is-signature').checked;

      const lifestylePerks = amenitiesRaw
        ? amenitiesRaw.split(',').map(s => s.trim()).filter(Boolean)
        : [];

      const propData = {
        id: id || undefined,
        title,
        name: title,
        location,
        area: subarea ? `${location} ${subarea}` : location,
        type,
        category,
        status,
        priceAED: price,
        price,
        bedrooms,
        bathrooms,
        areaSqFt,
        size: areaSqFt,
        image,
        heroImage: image,
        gallery,
        tagline,
        description: desc,
        overview: desc,
        lifestylePerks,
        isSignature
      };

      try {
        await saveProperty(propData);
        closePropertyModal();
        await loadProperties();
      } catch (err) {
        alert('Error saving property: ' + err.message);
      }
    });
  }
}

function openPropertyModal(prop = null) {
  formPropEditor.reset();
  currentGalleryImages = [];

  if (prop) {
    propModalTitle.textContent = `Edit Residence: ${prop.title || prop.name}`;
    document.getElementById('edit-prop-id').value = prop.id;
    document.getElementById('edit-title').value = prop.title || prop.name || '';
    document.getElementById('edit-location').value = prop.location || '';
    document.getElementById('edit-type').value = prop.type || 'Waterfront Island Villa';
    document.getElementById('edit-category').value = prop.category || (prop.isRent ? 'rent' : 'sale');
    document.getElementById('edit-status').value = prop.status || 'Exclusive Listing';
    document.getElementById('edit-price').value = prop.priceAED || prop.price || '';
    document.getElementById('edit-bedrooms').value = prop.bedrooms || '';
    document.getElementById('edit-bathrooms').value = prop.bathrooms || '';
    document.getElementById('edit-area').value = prop.areaSqFt || prop.size || '';
    document.getElementById('edit-subarea').value = prop.area || '';
    
    // Set cover photo preview
    const coverUrl = prop.image || prop.heroImage || '/images/villa_exterior.jpg';
    setCoverImagePreview(coverUrl);

    // Set gallery photos preview
    if (Array.isArray(prop.gallery) && prop.gallery.length > 0) {
      currentGalleryImages = [...prop.gallery];
    } else {
      currentGalleryImages = [coverUrl];
    }
    renderGalleryPreviews();

    document.getElementById('edit-tagline').value = prop.tagline || '';
    document.getElementById('edit-desc').value = prop.description || prop.overview || '';
    document.getElementById('edit-amenities').value = (prop.lifestylePerks || prop.highlights || []).join(', ');
    document.getElementById('edit-is-signature').checked = Boolean(prop.isSignature);
  } else {
    propModalTitle.textContent = 'List New Residence';
    document.getElementById('edit-prop-id').value = '';
    setCoverImagePreview('/images/villa_exterior.jpg');
    currentGalleryImages = [];
    renderGalleryPreviews();
    document.getElementById('edit-is-signature').checked = false;
  }

  modalPropEditor.classList.add('is-open');
  modalPropEditor.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePropertyModal() {
  modalPropEditor.classList.remove('is-open');
  modalPropEditor.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Boot
window.addEventListener('DOMContentLoaded', init);
