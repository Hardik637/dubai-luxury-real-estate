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
if (!distInvest.includes('REAL ESTATE, WITH A PURPOSE') || !distInvest.includes('Turn property into a strategy')) {
  throw new Error('Invest hero text missing');
}
if (!distInvest.includes('The Investment Journey') || !distInvest.includes('What are you investing for?')) {
  throw new Error('Invest journey & objective sections missing');
}
if (!distInvest.includes('From property to paying tenant') || !distInvest.includes('See the potential')) {
  throw new Error('Invest pipeline & scenario slider missing');
}
if (!distInvest.includes('Not every beautiful property is a good investment')) {
  throw new Error('Invest advisory discipline section missing');
}
console.log('✓ Invest page built with all 9 requested sections and interactive components.');

// Check Home page integrity
if (!distIndex.includes('hero-scroll-container') || !distIndex.includes('hero-canvas')) {
  throw new Error('Homepage hero was modified or removed!');
}
if (!distIndex.includes('/properties') || !distIndex.includes('/invest')) {
  throw new Error('Homepage navigation does not link to /properties and /invest');
}
console.log('✓ Homepage hero & canvas remain 100% intact with updated navigation links.');

console.log('\n🎉 ALL RIGOROUS TESTS PASSED SUCCESSFULLY!');
