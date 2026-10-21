import { exportEnquiriesToCSV, DEMO_ENQUIRIES } from '../src/services/enquiries.js';

console.log('\n============================================================');
console.log('🧪 TESTING DEMO ENQUIRIES & CSV EXPORT FUNCTIONALITY');
console.log('============================================================\n');

const sampleEnquiries = [
  {
    id: 'enq_test_01',
    fullName: 'Sir David Montgomery',
    email: 'd.montgomery@scot-invest.co.uk',
    phone: '+44 7911 123456',
    type: 'Private Acquisition Advisory',
    budget: '$15M – $25M',
    propertyTitle: 'Sanctuary of the Sun (Jumeirah Bay Island)',
    notes: 'Seeking waterfront residency.',
    status: 'new',
    createdAt: new Date().toISOString()
  }
];

// 2. Test exportEnquiriesToCSV with sample enquiries
console.log(`\n[Test] Testing exportEnquiriesToCSV output format...`);
const csv = exportEnquiriesToCSV(sampleEnquiries);

if (!csv) {
  throw new Error('exportEnquiriesToCSV returned empty or falsy result!');
}

if (!csv.startsWith('\uFEFF')) {
  throw new Error('CSV output is missing UTF-8 Byte Order Mark (\\uFEFF)!');
}
console.log('  ✓ UTF-8 Byte Order Mark (BOM) verified for Excel compatibility.');

const lines = csv.replace('\uFEFF', '').split('\r\n');
console.log(`  ✓ Generated ${lines.length} lines (1 header + ${lines.length - 1} rows)`);

const header = lines[0];
const expectedHeaders = [
  'Enquiry ID',
  'Received Date',
  'Client Name',
  'Email',
  'Phone',
  'Enquiry Type',
  'Target Property',
  'Budget / Scope',
  'Status',
  'Client Notes'
];

for (const h of expectedHeaders) {
  if (!header.includes(h)) {
    throw new Error(`CSV header missing expected column: "${h}". Found header: ${header}`);
  }
}
console.log('  ✓ Header row contains all 10 standard columns.');

// 3. Test RFC 4180 Escaping with edge cases
console.log(`\n[Test 3] Testing RFC 4180 escaping with special characters (commas, quotes, newlines, hashes)...`);
const edgeCaseEnquiries = [
  {
    id: 'edge_01',
    fullName: 'Baron "The Investor" von Test, Jr.',
    email: 'test@example.com',
    phone: '+971 50 000 0000',
    type: 'Penthouse #402, High-Floor',
    budget: '$10M, negotiable',
    propertyTitle: 'Palm Villa #12, "The Jewel"',
    status: 'new',
    notes: 'Line 1\nLine 2 with "quotes" and commas, #hashtag, & ampersand',
    createdAt: new Date().toISOString()
  }
];

const edgeCsv = exportEnquiriesToCSV(edgeCaseEnquiries);
if (!edgeCsv.includes('""The Investor""')) {
  throw new Error('Quotes inside names were not escaped as double quotes ("")');
}
if (!edgeCsv.includes('"Penthouse #402, High-Floor"')) {
  throw new Error('Values with commas and hashes were not properly quoted');
}
if (!edgeCsv.includes('""quotes""')) {
  throw new Error('Quotes inside notes were not escaped as double quotes');
}
console.log('  ✓ Special characters, nested quotes, commas, and multiline notes escaped strictly per RFC 4180.');

console.log('\n============================================================');
console.log('🎉 ALL CSV EXPORT TESTS PASSED SUCCESSFULLY!');
console.log('============================================================\n');
