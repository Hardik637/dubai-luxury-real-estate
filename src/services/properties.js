import { db, isFirebaseConfigured } from '../firebase-config.js';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { isAuthenticated } from './auth.js';
import { DEMO_PROPERTIES } from '../data/properties.js';

/**
 * Vision of Excellence — Property Catalog & Portfolio Service
 * 
 * Supports:
 * - Realtime Firestore sync when configured
 * - Resilient Local Storage cache
 * - Curated Signature Property toggle for homepage (NO public badge tag, just selection)
 * - Full CRUD capability for the Estate Owner
 */

const PROPERTIES_STORE_KEY = 'voe_properties_catalog_v2';

// Master initial catalog harmonizing all curated listings
export const INITIAL_PROPERTIES = DEMO_PROPERTIES;

function getStoredProperties() {
  try {
    const raw = localStorage.getItem(PROPERTIES_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= INITIAL_PROPERTIES.length) {
        return parsed;
      }
      if (Array.isArray(parsed) && parsed.length > 0) {
        const idMap = new Map();
        INITIAL_PROPERTIES.forEach(item => idMap.set(item.id, item));
        parsed.forEach(item => idMap.set(item.id, { ...(idMap.get(item.id) || {}), ...item }));
        const merged = Array.from(idMap.values());
        localStorage.setItem(PROPERTIES_STORE_KEY, JSON.stringify(merged));
        return merged;
      }
    }
  } catch (e) {
    // fallback
  }
  localStorage.setItem(PROPERTIES_STORE_KEY, JSON.stringify(INITIAL_PROPERTIES));
  return INITIAL_PROPERTIES;
}

function saveStoredProperties(props) {
  localStorage.setItem(PROPERTIES_STORE_KEY, JSON.stringify(props));
  window.dispatchEvent(new CustomEvent('voe:properties-updated', { detail: { properties: props } }));
}

/**
 * Get all active properties
 */
export async function getProperties() {
  if (isFirebaseConfigured && db) {
    try {
      const snapshot = await getDocs(collection(db, 'properties'));
      const list = [];
      snapshot.forEach(docSnap => {
        list.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (list.length > 0) {
        saveStoredProperties(list);
        return list;
      }
    } catch (err) {
      console.warn('Firestore properties fetch notice, using local cache:', err);
    }
  }
  return getStoredProperties();
}

/**
 * Get Signature Properties for Homepage
 * Returns ONLY properties where isSignature === true
 * Note: No signature badge or tag is added; presence in this list
 * dictates homepage display.
 */
export async function getSignatureProperties() {
  const all = await getProperties();
  const signature = all.filter(p => p.isSignature === true);
  // Fallback to first 4 if none explicitly checked
  return signature.length > 0 ? signature : all.slice(0, 4);
}

/**
 * Get Property by ID
 */
export async function getPropertyById(id) {
  const all = await getProperties();
  return all.find(p => p.id === id) || null;
}

/**
 * Save / Update Property (Admin Only)
 */
export async function saveProperty(propData) {
  if (!isAuthenticated()) {
    throw new Error('Access denied: Administrative authentication required.');
  }

  const list = getStoredProperties();
  const isNew = !propData.id;
  const id = isNew ? `estate-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}` : propData.id;

  const title = propData.title || propData.name || 'Untitled Residence';
  const priceAED = Number(propData.priceAED || propData.price || 0);

  const updatedProperty = {
    ...propData,
    id,
    title,
    name: title,
    priceAED,
    price: priceAED,
    isRent: propData.category === 'rent' || propData.isRent === true,
    bedrooms: Number(propData.bedrooms || 0),
    bathrooms: Number(propData.bathrooms || 0),
    areaSqFt: Number(propData.areaSqFt || propData.size || 0),
    size: Number(propData.areaSqFt || propData.size || 0),
    image: propData.image || propData.heroImage || '/images/villa_exterior.jpg',
    heroImage: propData.heroImage || propData.image || '/images/villa_exterior.jpg',
    gallery: Array.isArray(propData.gallery) ? propData.gallery : [propData.image || '/images/villa_exterior.jpg'],
    isSignature: Boolean(propData.isSignature),
    status: propData.status || 'Exclusive Listing',
    updatedAt: new Date().toISOString()
  };

  if (isNew) {
    updatedProperty.createdAt = new Date().toISOString();
    list.unshift(updatedProperty);
  } else {
    const idx = list.findIndex(p => p.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updatedProperty };
    } else {
      list.unshift(updatedProperty);
    }
  }

  saveStoredProperties(list);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'properties', id), updatedProperty);
    } catch (err) {
      console.warn('Firestore setDoc failed:', err);
    }
  }

  return { success: true, property: updatedProperty };
}

/**
 * Toggle Signature Status for Homepage
 */
export async function togglePropertySignature(id) {
  if (!isAuthenticated()) {
    throw new Error('Access denied.');
  }

  const list = getStoredProperties();
  const target = list.find(p => p.id === id);
  if (!target) throw new Error('Property not found.');

  target.isSignature = !target.isSignature;
  target.updatedAt = new Date().toISOString();

  saveStoredProperties(list);

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'properties', id), target, { merge: true });
    } catch (err) {
      console.warn('Firestore update failed:', err);
    }
  }

  return { success: true, isSignature: target.isSignature };
}

/**
 * Delete Property
 */
export async function deleteProperty(id) {
  if (!isAuthenticated()) {
    throw new Error('Access denied.');
  }

  const list = getStoredProperties();
  const updated = list.filter(p => p.id !== id);
  saveStoredProperties(updated);

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'properties', id));
    } catch (err) {
      console.warn('Firestore delete failed:', err);
    }
  }

  return { success: true };
}

/**
 * Reset to Curated Defaults
 */
export async function resetPropertiesToDefaults() {
  if (!isAuthenticated()) throw new Error('Access denied.');
  saveStoredProperties(INITIAL_PROPERTIES);
  return { success: true, properties: INITIAL_PROPERTIES };
}
