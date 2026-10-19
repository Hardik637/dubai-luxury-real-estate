import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import { DEMO_PROPERTIES } from '../src/data/properties.js';

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

async function seed() {
  console.log('Seeding initial properties to Cloud Firestore: voe-luxury-real-estate...');
  let count = 0;
  for (const prop of DEMO_PROPERTIES) {
    const id = prop.id || `prop-${count + 1}`;
    await setDoc(doc(db, 'properties', id), prop, { merge: true });
    count++;
    console.log(`✓ Uploaded property [${count}/${DEMO_PROPERTIES.length}]: ${prop.title}`);
  }

  // Also seed a welcome sample enquiry if none exists
  const enqSnapshot = await getDocs(collection(db, 'enquiries'));
  if (enqSnapshot.empty) {
    const sample = {
      fullName: 'Sir David Montgomery',
      email: 'd.montgomery@scot-invest.co.uk',
      phone: '+44 7911 123456',
      type: 'Private Acquisition Advisory',
      budget: '$15M – $25M',
      propertyTitle: 'Sanctuary of the Sun (Jumeirah Bay Island)',
      notes: 'Seeking waterfront residency with private 120ft yacht berth. UAE Golden Visa eligible.',
      status: 'new',
      createdAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'enquiries', 'enq_initial_01'), sample);
    console.log('✓ Uploaded initial enquiry: Sir David Montgomery');
  }

  console.log('✓ Seeding complete! Total properties uploaded:', count);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
