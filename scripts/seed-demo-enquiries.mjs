import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBIo0oTDczJ0vzbLKfGXI3B30EuMy0OZAk",
  authDomain: "voe-luxury-real-estate.firebaseapp.com",
  projectId: "voe-luxury-real-estate",
  storageBucket: "voe-luxury-real-estate.firebasestorage.app",
  messagingSenderId: "833284125333",
  appId: "1:833284125333:web:efc70f1b1783ae017f619c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const RICH_DEMO_ENQUIRIES = [
  {
    id: 'enq_demo_01',
    fullName: 'Sir David Montgomery',
    email: 'd.montgomery@scot-invest.co.uk',
    phone: '+44 7911 123456',
    type: 'Private Acquisition Advisory',
    budget: '$15M – $25M',
    propertyTitle: 'Sanctuary of the Sun (Jumeirah Bay Island)',
    notes: 'Seeking waterfront residency with private 120ft yacht berth. Require assistance with 10-Year UAE Golden Visa family sponsorship.',
    status: 'new',
    createdAt: new Date(Date.now() - 1.5 * 3600 * 1000).toISOString()
  },
  {
    id: 'enq_demo_02',
    fullName: 'Dr. Tariq Al-Mansoor',
    email: 'tariq.mansoor@almansoor-holding.sa',
    phone: '+966 50 555 7890',
    type: 'Chauffeur Viewing Request',
    budget: '$10M+',
    propertyTitle: 'Villa Al-Noor (Palm Jumeirah)',
    notes: 'Private weekend viewing requested for principal and security detail. Needs Rolls-Royce chauffeur transfer from DIFC.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 'enq_demo_03',
    fullName: 'Genevieve Vance',
    email: 'gvance@vancecap.com',
    phone: '+1 212 555 0192',
    type: 'Investment Strategy Advisory',
    budget: 'AED 45M+',
    propertyTitle: 'Portfolio Yield Allocation',
    notes: 'Evaluating prime freehold assets for institutional tax-free yield. Needs quarterly yield simulation model.',
    status: 'qualified',
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
  },
  {
    id: 'enq_demo_04',
    fullName: 'Alexandre de Saint-Germain',
    email: 'a.stgermain@monaco-wealth.mc',
    phone: '+377 93 25 00 11',
    type: 'Penthouse Acquisition',
    budget: '$30M – $50M',
    propertyTitle: 'The Horizon Sky Duplex (Downtown Dubai)',
    notes: 'Family office relocation from Monaco. Requires triplex penthouse with private rooftop infinity pool and panoramic Burj Khalifa views.',
    status: 'new',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'enq_demo_05',
    fullName: 'Sheikh Hamdan Al-Qasimi',
    email: 'h.alqasimi@holding.ae',
    phone: '+971 50 888 2211',
    type: 'Off-Market Island Villa',
    budget: 'AED 85,000,000',
    propertyTitle: 'The Dunes Oasis (Emirates Hills)',
    notes: 'Seeking ultra-private trophy compound with minimum 25,000 sq ft plot and subterranean 8-car gallery.',
    status: 'contacted',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
  },
  {
    id: 'enq_demo_06',
    fullName: 'Maximilian Sterling',
    email: 'max@sterling-partners.ch',
    phone: '+41 22 710 3344',
    type: 'Golden Visa & Real Estate',
    budget: '$8M – $12M',
    propertyTitle: 'The Royal Beachfront Residence',
    notes: 'Swiss tech entrepreneur looking for tax residency transition before Q4. Needs complete conveyancing and banking setup.',
    status: 'qualified',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  },
  {
    id: 'enq_demo_07',
    fullName: 'Vikram & Priya Singhania',
    email: 'v.singhania@mumbai-ventures.in',
    phone: '+91 98200 11223',
    type: 'Luxury Holiday Home',
    budget: 'AED 25M – $10M',
    propertyTitle: 'Palm Island Sunset Villa',
    notes: 'Private beachfront villa for winter months. Preferred fully turnkey furnished by Minotti or Poliform.',
    status: 'new',
    createdAt: new Date(Date.now() - 60 * 3600 * 1000).toISOString()
  },
  {
    id: 'enq_demo_08',
    fullName: 'Elena Rostova',
    email: 'elena.rostova@nordic-marina.fi',
    phone: '+358 40 123 4567',
    type: 'Rental Yield Investment',
    budget: '$5M – $8M',
    propertyTitle: 'Dubai Marina Luxury Tower',
    notes: 'Short-term luxury holiday rental portfolio. Looking for managed assets with guaranteed 8%+ net yield.',
    status: 'archived',
    createdAt: new Date(Date.now() - 96 * 3600 * 1000).toISOString()
  }
];

async function seedEnquiries() {
  console.log('--- SEEDING DEMO ENQUIRIES TO CLOUD FIRESTORE ---');
  let count = 0;
  for (const enq of RICH_DEMO_ENQUIRIES) {
    await setDoc(doc(db, 'enquiries', enq.id), enq, { merge: true });
    count++;
    console.log(`✓ [${count}/${RICH_DEMO_ENQUIRIES.length}] Uploaded lead: ${enq.fullName} (${enq.status}) — ${enq.budget}`);
  }
  console.log(`\n🎉 Successfully seeded ${count} luxury demo enquiries to Cloud Firestore!`);
  process.exit(0);
}

seedEnquiries().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
