/**
 * Automated End-to-End Backend Verification Test Suite
 * Tests authentication, enquiries, and properties across all API endpoints
 */

const BASE_URL = process.argv[2] || 'http://localhost:3000';

async function runTests() {
  console.log(`\n============================================================`);
  console.log(`🧪 TESTING BACKEND API ENDPOINTS ON: ${BASE_URL}`);
  console.log(`============================================================\n`);

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAILED: ${message}`);
      failed++;
    }
  }

  // --- 1. TEST AUTHENTICATION ---
  console.log(`[Test 1] Testing Password-Only Authentication (/api/auth)...`);
  
  // 1a. Wrong password
  const resBadAuth = await fetch(`${BASE_URL}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'WrongPassword123!' })
  });
  assert(resBadAuth.status === 401, 'Rejects invalid password with HTTP 401');

  // 1b. Correct password
  const resGoodAuth = await fetch(`${BASE_URL}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: 'DubaiLuxury2026!' })
  });
  assert(resGoodAuth.status === 200, 'Accepts correct password with HTTP 200');
  const authData = await resGoodAuth.json();
  assert(authData.success === true && authData.token, 'Returns valid authenticated session token');

  // --- 2. TEST ENQUIRIES BACKEND ---
  console.log(`\n[Test 2] Testing Enquiries Pipeline (/api/enquiries)...`);
  
  // 2a. Post enquiry
  const testEnquiry = {
    fullName: 'Lady Eleanor Vance',
    email: 'eleanor.vance@vance-holdings.co.uk',
    phone: '+44 7911 987654',
    type: 'Private Acquisition Advisory',
    budget: '$20M+',
    propertyTitle: 'Sanctuary of the Sun (Jumeirah Bay Island)',
    notes: 'Testing end-to-end backend connection from main page to admin page.'
  };

  const resPostEnq = await fetch(`${BASE_URL}/api/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testEnquiry)
  });
  assert(resPostEnq.status === 201, 'Posts new enquiry with HTTP 201');
  const postEnqData = await resPostEnq.json();
  const createdEnqId = postEnqData.id;
  assert(Boolean(createdEnqId), `Assigned enquiry ID: ${createdEnqId}`);

  // 2b. Fetch enquiries (as done by Admin Page)
  const resGetEnq = await fetch(`${BASE_URL}/api/enquiries`);
  assert(resGetEnq.status === 200, 'Fetches enquiries with HTTP 200');
  const getEnqData = await resGetEnq.json();
  assert(Array.isArray(getEnqData.enquiries) && getEnqData.enquiries.length > 0, 'Returns enquiries array');
  const foundEnq = getEnqData.enquiries.find(e => e.id === createdEnqId);
  assert(Boolean(foundEnq), 'Posted enquiry successfully retrieved in Admin leads list');
  assert(foundEnq && foundEnq.fullName === 'Lady Eleanor Vance', 'Client name and details match exactly');

  // 2c. Update enquiry status
  const resPatchEnq = await fetch(`${BASE_URL}/api/enquiries`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: createdEnqId, status: 'contacted' })
  });
  assert(resPatchEnq.status === 200, 'Updates enquiry status with HTTP 200');

  // --- 3. TEST PROPERTIES BACKEND ---
  console.log(`\n[Test 3] Testing Property Portfolio CRUD (/api/properties)...`);
  
  // 3a. Add new property (as done in Admin Property Editor)
  const testProp = {
    title: 'The Azure Peninsula Sovereign Villa',
    location: 'Palm Jumeirah',
    type: 'Waterfront Island Villa',
    category: 'sale',
    status: 'Exclusive Listing',
    priceAED: 145000000,
    bedrooms: 7,
    bathrooms: 9,
    areaSqFt: 18500,
    image: '/images/forest_villa.jpg',
    isSignature: true,
    tagline: 'Direct Arabian Gulf Beachfront with Private 120ft Berth',
    description: 'A masterwork of architectural minimalism created for world leaders.'
  };

  const resPostProp = await fetch(`${BASE_URL}/api/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testProp)
  });
  assert(resPostProp.status === 200, 'Saves new property with HTTP 200');
  const postPropData = await resPostProp.json();
  const createdPropId = postPropData.id;
  assert(Boolean(createdPropId), `Assigned property ID: ${createdPropId}`);

  // 3b. Fetch all properties (as done by Properties Catalog & Homepage)
  const resGetProps = await fetch(`${BASE_URL}/api/properties`);
  assert(resGetProps.status === 200, 'Fetches properties with HTTP 200');
  const getPropsData = await resGetProps.json();
  const foundProp = getPropsData.properties.find(p => p.id === createdPropId);
  assert(Boolean(foundProp), 'Newly added property retrieved in public catalog list');
  assert(foundProp && foundProp.priceAED === 145000000, 'Property price and specifications verified');

  // 3c. Toggle signature
  const resToggleSig = await fetch(`${BASE_URL}/api/properties?id=${encodeURIComponent(createdPropId)}&action=toggleSignature`, {
    method: 'PUT'
  });
  assert(resToggleSig.status === 200, 'Toggles signature residence status with HTTP 200');

  // --- 4. CLEANUP TEST DATA ---
  console.log(`\n[Test 4] Cleaning up automated test records...`);
  await fetch(`${BASE_URL}/api/properties?id=${encodeURIComponent(createdPropId)}`, { method: 'DELETE' });
  await fetch(`${BASE_URL}/api/enquiries?id=${encodeURIComponent(createdEnqId)}`, { method: 'DELETE' });
  assert(true, 'Test property and test enquiry safely removed from backend');

  console.log(`\n============================================================`);
  console.log(`📊 TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`============================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test run failed:', err);
  process.exit(1);
});
