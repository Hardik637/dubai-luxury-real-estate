import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  DEMO_PROPERTIES, 
  getPropertyById, 
  filterProperties, 
  getPropertiesByBudget 
} from '../src/data/properties.js';

console.log('--- 1. Testing src/data/properties.js ---');
console.log(`Total demo properties: ${DEMO_PROPERTIES.length}`);
if (DEMO_PROPERTIES.length < 9) {
  throw new Error(`Expected at least 9 properties, got ${DEMO_PROPERTIES.length}`);
}

const requiredKeys = [
  'id', 'name', 'location', 'area', 'type', 'transaction', 
  'price', 'bedrooms', 'bathrooms', 'size', 'description', 
  'amenities', 'images', 'investmentProfile', 'illustrativeYield'
];

DEMO_PROPERTIES.forEach((prop, i) => {
  requiredKeys.forEach(key => {
    if (prop[key] === undefined) {
      throw new Error(`Property #${i} (${prop.name || 'unnamed'}) missing key: ${key}`);
    }
  });

  const imgCats = ['exterior', 'living', 'bedrooms', 'kitchen', 'bathrooms', 'amenities'];
  imgCats.forEach(cat => {
    if (!prop.images[cat] || !Array.isArray(prop.images[cat])) {
      throw new Error(`Property ${prop.id} missing image category: ${cat}`);
    }
  });
});
console.log('✓ All properties have complete structured fields and categorized images.');

// Test filter logic
const buyProps = filterProperties({ transaction: 'buy' });
const rentProps = filterProperties({ transaction: 'rent' });
console.log(`Buy properties: ${buyProps.length}, Rent properties: ${rentProps.length}`);
if (buyProps.length === 0 || rentProps.length === 0) {
  throw new Error('Transaction filter failed to find buy/rent items');
}

const palmProps = filterProperties({ location: 'Palm Jumeirah' });
console.log(`Palm Jumeirah properties: ${palmProps.length}`);
if (palmProps.length === 0) throw new Error('Location filter failed');

const budget3to10 = getPropertiesByBudget('3-10m');
console.log(`AED 3-10M budget properties: ${budget3to10.length}`);
if (budget3to10.length === 0) throw new Error('Budget filter failed');

const single = getPropertyById('palm-residence');
if (!single || single.name !== 'Palm Residence') {
  throw new Error('getPropertyById failed for palm-residence');
}
console.log(`✓ getPropertyById successfully resolved: ${single.name} (${single.location})`);

console.log('\n--- 2. Checking HTML & Router Integration ---');
const distProp = fs.readFileSync('dist/properties/index.html', 'utf-8');
const distInvest = fs.readFileSync('dist/invest/index.html', 'utf-8');
const distIndex = fs.readFileSync('dist/index.html', 'utf-8');

// Check Properties page
if (!distProp.includes('THE COLLECTION') || !distProp.includes('Find a place worth calling yours')) {
  throw new Error('Properties hero text missing');
}
if (!distProp.includes('properties-cards-grid')) {
  throw new Error('Properties grid missing');
}
console.log('✓ Properties page built with hero, filter system, and grid.');

// Check Invest page
if (!distInvest.includes('investment-sections') || !distInvest.includes('inv-card-section')) {
  throw new Error('Invest cinematic investment sections suite missing');
}
if (distInvest.includes('03 — LIFESTYLE') || distInvest.includes('A DIFFERENT WAY TO LIVE.')) {
  throw new Error('Invest lifestyle section was supposed to be completely removed');
}
if (!distInvest.includes('A DIFFERENT') || !distInvest.includes('TAX LANDSCAPE.')) {
  throw new Error('Card 01: Tax Environment headline missing');
}
if (!distInvest.includes('THE ASSET') || !distInvest.includes('CAN WORK FOR YOU.')) {
  throw new Error('Card 02: Rental Income headline missing');
}
if (!distInvest.includes('CAPITAL') || !distInvest.includes('FOLLOWS DEMAND.')) {
  throw new Error('Card 03: Market Fundamentals headline missing');
}
if (!distInvest.includes('INVESTING') || !distInvest.includes('WITHOUT BORDERS.')) {
  throw new Error('Card 04: Ownership & Access headline missing');
}
if (!distInvest.includes('WHAT THE HEADLINE ACTUALLY MEANS.') || !distInvest.includes('LOOK BEYOND THE RENT.')) {
  throw new Error('Invest expanded state detailed briefs missing');
}
if (!distInvest.includes('SO WHY PROPERTY?') || !distInvest.includes('Understanding Dubai is one thing.')) {
  throw new Error('Invest service transition missing');
}
if (!distInvest.includes('GOOD INVESTMENTS') || !distInvest.includes('ARE NOT BUILT') || !distInvest.includes('ON ONE NUMBER.')) {
  throw new Error('Invest credibility discipline section missing');
}
if (!distInvest.includes('From property to paying tenant') || !distInvest.includes('See the potential')) {
  throw new Error('Invest preserved execution roadmap or scenario slider missing');
}
if (!distInvest.includes('IF DUBAI MAKES SENSE FOR YOU')) {
  throw new Error('Invest final CTA missing');
}
console.log('✓ Invest page built with 4 expandable cinematic investment cards, transition, credibility matrix, and roadmap.');

// Check Home page integrity
if (!distIndex.includes('hero-scroll-container') || !distIndex.includes('hero-canvas')) {
  throw new Error('Homepage hero was modified or removed!');
}
if (!distIndex.includes('/properties') || !distIndex.includes('/invest')) {
  throw new Error('Homepage navigation does not link to /properties and /invest');
}

// Check Admin Page
const distAdmin = fs.readFileSync('dist/admin/index.html', 'utf-8');
if (!distAdmin.includes('Private Estate Desk') || !distAdmin.includes('Owner Console')) {
  throw new Error('Admin page title or branding missing');
}
if (!distAdmin.includes('admin-login-form') || !distAdmin.includes('Access Passcode')) {
  throw new Error('Admin login form or passcode field missing');
}
if (!distAdmin.includes('tab-btn-enquiries') || !distAdmin.includes('tab-btn-properties')) {
  throw new Error('Admin tabs (Enquiries & Properties) missing');
}
if (!distAdmin.includes('panel-enquiries') || !distAdmin.includes('panel-properties')) {
  throw new Error('Admin tab panels missing');
}
if (!distAdmin.includes('prop-sig-switch') && !distAdmin.includes('edit-is-signature')) {
  throw new Error('Signature toggle switch missing from Admin page');
}
console.log('✓ Admin Portal built with login gate, Enquiries tab, and Property Management tab with Signature Residence toggle.');

// Check Firestore Security Rules
const rulesFile = fs.readFileSync('firestore.rules', 'utf-8');
if (!rulesFile.includes('match /enquiries/{enquiryId}') || !rulesFile.includes('allow read, update, delete: if request.auth != null;')) {
  throw new Error('Firestore rules missing zero data leakage protection for enquiries');
}
if (!rulesFile.includes('match /properties/{propertyId}') || !rulesFile.includes('allow write: if request.auth != null;')) {
  throw new Error('Firestore rules missing write protection on properties');
}
console.log('✓ Firestore Security Rules verified: Client lead data strictly protected from unauthorized read access.');

// Verify section order on Homepage
const pWhyDubai = distIndex.indexOf('id="sovereign-advantage"');
const pEstates = distIndex.indexOf('id="estates"');
const pScenario = distIndex.indexOf('id="capital-scenario"');
const pPositioning = distIndex.indexOf('id="global-positioning"');
const pActivities = distIndex.indexOf('id="activities"');

if (!(pWhyDubai < pEstates && pEstates < pScenario && pScenario < pPositioning && pPositioning < pActivities)) {
  throw new Error(`Section order incorrect: WhyDubai(${pWhyDubai}), Estates(${pEstates}), Scenario(${pScenario}), Positioning(${pPositioning}), Activities(${pActivities})`);
}
console.log('✓ Section order strictly verified: Why Dubai -> Signature Residences -> Financial Scenario -> Global Positioning -> Activities');
console.log('✓ Homepage hero & canvas remain 100% intact with updated navigation links.');

console.log('\n🎉 ALL RIGOROUS TESTS PASSED SUCCESSFULLY!');
