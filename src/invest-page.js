import { 
  DEMO_PROPERTIES, 
  getPropertiesByBudget, 
  formatCurrencyAED 
} from './data/properties.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavbarAndDrawer();
  initInvestPageInteractions();
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

function initInvestPageInteractions() {
  setupObjectiveSelector();
  setupBudgetSelector();
  setupScenarioSlider();
  renderInvestmentOpportunities();
  setupPlanModal();

  // Scroll to opportunities
  const viewOppBtn = document.getElementById('btn-view-opps');
  if (viewOppBtn) {
    viewOppBtn.addEventListener('click', () => {
      const target = document.getElementById('investment-opportunities-section');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Build plan buttons open modal
  const heroPlanBtn = document.getElementById('btn-hero-build-plan');
  const closePlanBtn = document.getElementById('btn-close-build-plan');
  if (heroPlanBtn) heroPlanBtn.addEventListener('click', openPlanModal);
  if (closePlanBtn) closePlanBtn.addEventListener('click', openPlanModal);
}

// --------------------------------------------------------------------------
// SECTION — WHAT IS YOUR OBJECTIVE?
// --------------------------------------------------------------------------
function setupObjectiveSelector() {
  const cards = document.querySelectorAll('.objective-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

// --------------------------------------------------------------------------
// SECTION — INVESTMENT BUDGET SELECTOR
// --------------------------------------------------------------------------
function setupBudgetSelector() {
  const buttons = document.querySelectorAll('.budget-tier-btn');
  const grid = document.getElementById('budget-properties-grid');

  function renderTier(tier) {
    if (!grid) return;
    const properties = getPropertiesByBudget(tier);
    grid.innerHTML = properties.map(prop => `
      <a href="/properties/${prop.id}" class="property-editorial-card" data-id="${prop.id}">
        <div class="card-media-wrapper">
          <img src="${prop.coverImage || prop.images.exterior[0]}" alt="${prop.name}" class="card-property-img" loading="lazy" />
          <span class="card-subtle-badge">DEMO DATA</span>
        </div>
        <div class="card-details-panel">
          <div class="invest-card-profile-tag">
            <span>●</span> ${prop.investmentProfile.toUpperCase()} STRATEGY
          </div>
          <h3 class="card-property-name">${prop.name}</h3>
          <p class="card-property-location">${prop.location}</p>
          <div class="card-property-price">${prop.priceDisplay}</div>
          <div class="invest-card-yield">
            Illustrative Yield: ~${prop.illustrativeYield}%*
          </div>
        </div>
      </a>
    `).join('');
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tier = btn.getAttribute('data-tier');
      renderTier(tier);
    });
  });

  // Default to 3-10M
  renderTier('3-10m');
}

// --------------------------------------------------------------------------
// SECTION — SEE THE POTENTIAL (SCENARIO SLIDER)
// --------------------------------------------------------------------------
function setupScenarioSlider() {
  const slider = document.getElementById('potential-range-slider');
  const valInvest = document.getElementById('pot-val-investment');
  const valRent = document.getElementById('pot-val-rent');
  const valYield = document.getElementById('pot-val-yield');

  if (!slider) return;

  function updateScenario() {
    const capital = parseFloat(slider.value);
    // Illustrative baseline model for demonstration: 6.8% gross yield
    const yieldPct = 6.8;
    const annualRent = capital * (yieldPct / 100);

    if (valInvest) valInvest.textContent = `AED ${(capital / 1000000).toFixed(1)}M`;
    if (valRent) valRent.textContent = formatCurrencyAED(Math.round(annualRent));
    if (valYield) valYield.textContent = `${yieldPct.toFixed(1)}%`;
  }

  slider.addEventListener('input', updateScenario);
  updateScenario();
}

// --------------------------------------------------------------------------
// SECTION — DEMO INVESTMENT OPPORTUNITIES
// --------------------------------------------------------------------------
function renderInvestmentOpportunities() {
  const grid = document.getElementById('invest-opportunities-grid');
  if (!grid) return;

  // Curate 4 top investment demo properties
  const opportunities = DEMO_PROPERTIES.slice(0, 4);

  grid.innerHTML = opportunities.map(prop => `
    <a href="/properties/${prop.id}" class="property-editorial-card" data-id="${prop.id}">
      <div class="card-media-wrapper">
        <img src="${prop.coverImage || prop.images.exterior[0]}" alt="${prop.name}" class="card-property-img" loading="lazy" />
        <span class="card-subtle-badge">${prop.transaction === 'rent' ? 'FOR RENT' : 'FOR SALE'}</span>
      </div>
      <div class="card-details-panel">
        <div class="invest-card-profile-tag">
          <span>●</span> ${prop.investmentProfile.toUpperCase()} PROFILE
        </div>
        <h3 class="card-property-name">${prop.name}</h3>
        <p class="card-property-location">${prop.location}</p>
        <div class="card-property-price">${prop.priceDisplay}</div>
        <div class="invest-card-yield">
          Illustrative Net Yield: ${prop.illustrativeYield}%*
        </div>
      </div>
    </a>
  `).join('');
}

// --------------------------------------------------------------------------
// INVESTMENT PLAN MODAL
// --------------------------------------------------------------------------
function setupPlanModal() {
  let modal = document.getElementById('invest-plan-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'invest-plan-modal';
    modal.className = 'modal-backdrop';
    modal.innerHTML = `
      <div class="modal-dialog modal-dialog-medium">
        <button type="button" class="modal-close-btn" id="plan-modal-close-btn" aria-label="Close modal">✕</button>
        <div class="modal-content modal-padded">
          <span class="visual-eyebrow">Advisory Consultation</span>
          <h3 class="modal-title">Build Your Investment Plan</h3>
          <p class="modal-desc">
            Share your allocation target and strategy. Our private portfolio directors will prepare a bespoke acquisition scenario.
          </p>
          <form id="invest-plan-form" class="minimal-clean-form">
            <div class="form-row-compact">
              <input type="text" id="plan-name" required placeholder="Full Name" />
              <input type="text" id="plan-contact" required placeholder="Email or WhatsApp" />
            </div>
            <div class="form-row-compact">
              <select id="plan-objective-select" class="sheet-custom-select" style="margin-bottom: 0;">
                <option value="income">Objective: Income & Rental Yield</option>
                <option value="growth">Objective: Long-Term Capital Growth</option>
                <option value="balanced">Objective: Balanced Hybrid Strategy</option>
              </select>
              <select id="plan-budget-select" class="sheet-custom-select" style="margin-bottom: 0;">
                <option value="1-3m">Target: AED 1M – 3M</option>
                <option value="3-10m" selected>Target: AED 3M – 10M</option>
                <option value="10m-plus">Target: AED 10M+</option>
              </select>
            </div>
            <textarea id="plan-notes" rows="3" placeholder="Timeline, preferred communities, or residency interest..."></textarea>
            <button type="submit" class="btn-dark btn-submit-full" id="plan-submit-btn">
              Request Confidential Strategy Call
            </button>
          </form>
          <div id="plan-success-box" class="form-success-box" style="display: none; margin-top: 20px;">
            <h4>Investment Request Received</h4>
            <p>A Senior Portfolio Advisory Director will contact you within 24 business hours.</p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('plan-modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closePlanModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closePlanModal();
    });

    const form = document.getElementById('invest-plan-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const success = document.getElementById('plan-success-box');
        if (success) success.style.display = 'block';
        form.style.display = 'none';
      });
    }
  }
}

function openPlanModal() {
  setupPlanModal();
  const modal = document.getElementById('invest-plan-modal');
  const form = document.getElementById('invest-plan-form');
  const success = document.getElementById('plan-success-box');

  if (form) form.style.display = 'block';
  if (success) success.style.display = 'none';

  if (modal) {
    modal.classList.add('is-open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function closePlanModal() {
  const modal = document.getElementById('invest-plan-modal');
  if (modal) {
    modal.classList.remove('is-open');
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}
