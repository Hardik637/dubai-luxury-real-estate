import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Vision of Excellence — Firebase Configuration
 * 
 * Supports production environment variables (VITE_FIREBASE_*)
 * with seamless fallback for offline / standalone development.
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
};

const hasValidConfig = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== 'YOUR_API_KEY'
);

let app = null;
let db = null;
let auth = null;

if (hasValidConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
    console.info('✓ Firebase Services Initialized for Vision of Excellence');
  } catch (err) {
    console.warn('Firebase initialization notice: Running in resilient secure local vault mode', err);
  }
}

export const isFirebaseConfigured = Boolean(app && db);
export { app, db, auth, firebaseConfig };
