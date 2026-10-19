import { isAuthenticated } from './auth.js';
import { DEMO_PROPERTIES } from '../data/properties.js';
import { db } from '../firebase-config.js';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

/**
 * Vision of Excellence — Property Catalog & Portfolio Service
 * Connected to live Cloud Firestore (voe-luxury-real-estate) with local cache fallback
 */

const PROPERTIES_STORE_KEY = 'voe_properties_catalog_v3';

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
 * Get all active properties from Cloud Firestore with API & local cache
 */
export async function getProperties() {
  // 1. Fetch from live Cloud Firestore
  if (db) {
    try {
      const snapshot = await getDocs(collection(db, 'properties'));
      const props = [];
      snapshot.forEach(docSnap => {
        props.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (props.length > 0) {
        saveStoredProperties(props);
        return props;
      }
    } catch (fbErr) {
      console.warn('Cloud Firestore getProperties notice:', fbErr.message);
    }
  }

  // 2. Fetch from backend API
  try {
    const res = await fetch('/api/properties');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.properties) && data.properties.length > 0) {
        saveStoredProperties(data.properties);
        return data.properties;
      }
    }
  } catch (err) {
    console.warn('Backend /api/properties fetch notice, using local cache:', err.message);
  }

  return getStoredProperties();
}

/**
 * Get Signature Properties for Homepage
 */
export async function getSignatureProperties() {
  const all = await getProperties();
  const signature = all.filter(p => p.isSignature === true);
  return signature.length > 0 ? signature : all.slice(0, 4);
}

/**
 * Get Property by ID
 */
export async function getPropertyById(id) {
  if (!id) return null;
  const cleanId = String(id).trim().toLowerCase().replace(/^\/properties\/?/, '');
  const all = await getProperties();
  return all.find(p => p.id === cleanId) || null;
}

/**
 * Save / Update Property (Admin Only)
 * Posts to live backend API (/api/properties) and updates local cache
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
    gallery: Array.isArray(propData.gallery) && propData.gallery.length > 0 ? propData.gallery : [propData.image || '/images/villa_exterior.jpg'],
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

  // 2. Save directly to live Cloud Firestore
  if (db) {
    try {
      await setDoc(doc(db, 'properties', id), updatedProperty, { merge: true });
      console.info('✓ Live property committed to Cloud Firestore:', id);
    } catch (fbErr) {
      console.warn('Cloud Firestore saveProperty notice:', fbErr.message);
    }
  }

  // 3. Send to backend API
  try {
    const res = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProperty)
    });
    if (res.ok) {
      const result = await res.json();
      if (result.property) {
        return { success: true, property: result.property };
      }
    }
  } catch (err) {
    console.warn('Backend /api/properties save notice, saved to local cache:', err.message);
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

  // Update in Cloud Firestore
  if (db) {
    try {
      await setDoc(doc(db, 'properties', id), { isSignature: target.isSignature }, { merge: true });
    } catch (fbErr) {
      console.warn('Cloud Firestore toggle signature notice:', fbErr.message);
    }
  }

  try {
    await fetch(`/api/properties?id=${encodeURIComponent(id)}&action=toggleSignature`, {
      method: 'PUT'
    });
  } catch (err) {
    console.warn('Backend toggle signature notice:', err.message);
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

  // Delete from Cloud Firestore
  if (db) {
    try {
      await deleteDoc(doc(db, 'properties', id));
      console.info('✓ Property removed from Cloud Firestore:', id);
    } catch (fbErr) {
      console.warn('Cloud Firestore delete notice:', fbErr.message);
    }
  }

  try {
    await fetch(`/api/properties?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Backend delete notice:', err.message);
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
