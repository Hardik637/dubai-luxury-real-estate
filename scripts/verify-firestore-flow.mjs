import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

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

async function runVerification() {
  console.log('--- STARTING FIRESTORE BACKEND VERIFICATION ---');

  // Test 1: Submit enquiry from main page
  const testEnquiry = {
    fullName: 'Automated Client Test',
    email: 'test.principal@dubai-estate.ae',
    phone: '+971 50 123 4567',
    type: 'Private Yacht Berth Enquiry',
    budget: '$30M+',
    propertyTitle: 'Sanctuary of the Sun',
    notes: 'Testing real-time Firestore database connection.',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  const newDocRef = await addDoc(collection(db, 'enquiries'), testEnquiry);
  console.log('✓ 1. Enquiry successfully written to Firestore:', newDocRef.id);

  // Test 2: Admin retrieving enquiries
  const enqSnapshot = await getDocs(collection(db, 'enquiries'));
  const found = enqSnapshot.docs.find(d => d.id === newDocRef.id);
  if (!found) throw new Error('Enquiry was not found in Firestore query!');
  console.log('✓ 2. Enquiry successfully queried by Admin portal. Total enquiries:', enqSnapshot.size);

  // Test 3: Admin updating enquiry status
  await updateDoc(doc(db, 'enquiries', newDocRef.id), { status: 'qualified' });
  console.log('✓ 3. Enquiry status successfully updated to "qualified".');

  // Test 4: Admin adding a new property
  const testPropId = `test-villa-${Date.now()}`;
  const testProp = {
    id: testPropId,
    title: 'The Royal Penthouse Atlantis',
    priceAED: 180000000,
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 18500,
    category: 'buy',
    isSignature: true,
    status: 'Exclusive Listing',
    image: '/images/villa_exterior.jpg'
  };
  await setDoc(doc(db, 'properties', testPropId), testProp);
  console.log('✓ 4. Admin successfully added property to Firestore:', testPropId);

  // Test 5: Verify properties query
  const propSnapshot = await getDocs(collection(db, 'properties'));
  const propFound = propSnapshot.docs.find(d => d.id === testPropId);
  if (!propFound) throw new Error('Added property not found in Firestore properties collection!');
  console.log('✓ 5. Newly added property successfully verified in Firestore catalog. Total properties:', propSnapshot.size);

  // Clean up test documents
  await deleteDoc(doc(db, 'enquiries', newDocRef.id));
  await deleteDoc(doc(db, 'properties', testPropId));
  console.log('✓ 6. Cleaned up temporary test documents.');

  console.log('\n=============================================');
  console.log('>>> ALL FIRESTORE BACKEND TESTS PASSED 100%! <<<');
  console.log('=============================================\n');
  process.exit(0);
}

runVerification().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
