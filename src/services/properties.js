import { db, isFirebaseConfigured } from '../firebase-config.js';
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { isAuthenticated } from './auth.js';

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
export const INITIAL_PROPERTIES = [
  {
    id: "estate-jumeirah-bay",
    title: "Sanctuary of the Sun",
    name: "Sanctuary of the Sun",
    type: "Waterfront Island Villa",
    category: "sale",
    location: "Jumeirah Bay Island",
    area: "Jumeirah Bay Island Seahorse",
    priceAED: 165000000,
    price: 165000000,
    isRent: false,
    bedrooms: 7,
    bathrooms: 9,
    areaSqFt: 21500,
    size: 21500,
    image: "/images/jumeirah_bay_island.jpg",
    heroImage: "/images/jumeirah_bay_island.jpg",
    gallery: [
      "/images/jumeirah_bay_island.jpg",
      "/images/villa_exterior.jpg",
      "/images/penthouse_interior.jpg"
    ],
    status: "Private Placement",
    isSignature: true, // Appears on Homepage Curated Residences
    tagline: "Ultra-private island enclave with private yacht berth and direct open Gulf panoramas.",
    description: "Conceived by Italian architectural masters, this residence on the prestigious seahorse island represents the apex of waterfront tranquility. Featuring 40 meters of private sea frontage, a dedicated 120ft yacht berth, travertine infinity pool, and discreet staff quarters.",
    overview: "Conceived by Italian architectural masters, this residence on the prestigious seahorse island represents the apex of waterfront tranquility. Featuring 40 meters of private sea frontage, a dedicated 120ft yacht berth, travertine infinity pool, and discreet staff quarters.",
    specs: {
      plotSize: "28,400 sq.ft",
      builtYear: "2024",
      view: "Unobstructed Arabian Gulf & Downtown Skyline",
      parking: "6 Subterranean Spaces",
      finishes: "Roman Travertine, Brushed Bronze, Smoked Oak"
    },
    lifestylePerks: [
      "Private 120ft Superyacht Slip",
      "Thermal Spa & Cold Plunge Suite",
      "Private White Sand Shoreline",
      "Direct Helipad Access (Island)",
      "Bulgari Resort Proximity (3 min)"
    ],
    createdAt: "2026-01-15T10:00:00.000Z"
  },
  {
    id: "estate-palm-villa",
    title: "Villa Al-Noor",
    name: "Villa Al-Noor",
    type: "Beachfront Frond Estate",
    category: "sale",
    location: "Palm Jumeirah",
    area: "Palm Jumeirah Frond M",
    priceAED: 115000000,
    price: 115000000,
    isRent: false,
    bedrooms: 6,
    bathrooms: 8,
    areaSqFt: 16500,
    size: 16500,
    image: "/images/villa_exterior.jpg",
    heroImage: "/images/villa_exterior.jpg",
    gallery: [
      "/images/villa_exterior.jpg",
      "/images/penthouse_interior.jpg",
      "/images/yacht_lifestyle.jpg"
    ],
    status: "Exclusive Listing",
    isSignature: true, // Appears on Homepage Curated Residences
    tagline: "Architectural purity carved in limestone along the tranquil waters of the Palm fronds.",
    description: "Bathed in the warm light of the Arabian sunset, Villa Al-Noor merges indoor serenity with private beach living. Expansive floor-to-ceiling glass folds away to reveal a 25-meter infinity pool, bespoke Japanese zen garden, and a private sheltered beachfront with calm crystalline waters.",
    overview: "Bathed in the warm light of the Arabian sunset, Villa Al-Noor merges indoor serenity with private beach living. Expansive floor-to-ceiling glass folds away to reveal a 25-meter infinity pool, bespoke Japanese zen garden, and a private sheltered beachfront with calm crystalline waters.",
    specs: {
      plotSize: "19,200 sq.ft",
      builtYear: "2024",
      view: "Burj Al Arab & Royal Atlantis Silhouette",
      parking: "4 Climatized Bays",
      finishes: "Limestone, Cedar Louvers, Fluted Calacatta Marble"
    },
    lifestylePerks: [
      "Private Calm-Water Beach Access",
      "25m Floating Edge Pool",
      "Temperature-Controlled Wine Gallery",
      "Private Rooftop Sunset Pavilion",
      "Smart Home Automation by Crestron"
    ],
    createdAt: "2026-01-18T10:00:00.000Z"
  },
  {
    id: "estate-downtown-penthouse",
    title: "The Horizon Sky Duplex",
    name: "The Horizon Sky Duplex",
    type: "Sky Penthouse",
    category: "sale",
    location: "Downtown Dubai",
    area: "Downtown Dubai Opera District",
    priceAED: 78000000,
    price: 78000000,
    isRent: false,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 9800,
    size: 9800,
    image: "/images/penthouse_interior.jpg",
    heroImage: "/images/penthouse_interior.jpg",
    gallery: [
      "/images/penthouse_interior.jpg",
      "/images/villa_exterior.jpg",
      "/images/desert_estate.jpg"
    ],
    status: "Active Portfolio",
    isSignature: true, // Appears on Homepage Curated Residences
    tagline: "Floating above the clouds with 360-degree panoramas of the iconic Dubai skyline.",
    description: "A triumph of minimalist volume and light, this two-story sky residence occupies the crowning levels of Downtown's most discreet residential tower. Features double-height 7-meter ceilings, private indoor lap pool, and bespoke furnishings curated from Milan.",
    overview: "A triumph of minimalist volume and light, this two-story sky residence occupies the crowning levels of Downtown's most discreet residential tower. Features double-height 7-meter ceilings, private indoor lap pool, and bespoke furnishings curated from Milan.",
    specs: {
      plotSize: "Duplex Levels 68 & 69",
      builtYear: "2023",
      view: "Burj Khalifa, Dubai Opera & Persian Gulf",
      parking: "5 Dedicated Valet Spots",
      finishes: "French Oak Parquet, Travertine, Fluted Brass"
    },
    lifestylePerks: [
      "Private High-Speed Elevator with Biometrics",
      "Heated Sky Lap Pool & Sunset Terrace",
      "Direct Chauffeured House Car Service",
      "Private 12-Seat Cinema & Screening Lounge",
      "24/7 Dedicated Concierge & Sommelier"
    ],
    createdAt: "2026-01-20T10:00:00.000Z"
  },
  {
    id: "estate-emirates-hills",
    title: "The Dunes Oasis",
    name: "The Dunes Oasis",
    type: "Golf Course Sanctuary",
    category: "sale",
    location: "Emirates Hills",
    area: "Emirates Hills Sector E",
    priceAED: 92000000,
    price: 92000000,
    isRent: false,
    bedrooms: 6,
    bathrooms: 7,
    areaSqFt: 18200,
    size: 18200,
    image: "/images/desert_estate.jpg",
    heroImage: "/images/desert_estate.jpg",
    gallery: [
      "/images/desert_estate.jpg",
      "/images/villa_exterior.jpg",
      "/images/penthouse_interior.jpg"
    ],
    status: "Private Placement",
    isSignature: true, // Appears on Homepage Curated Residences
    tagline: "Quiet seclusion wrapped in ancient olive trees, rammed earth walls, and golf fairways.",
    description: "Designed for ultimate privacy and contemplation, this estate redefines modern desert luxury. Organic limestone, rammed earth textures, and extensive reflecting ponds create a serene microclimate, while the championship golf course provides a lush endless green backdrop.",
    overview: "Designed for ultimate privacy and contemplation, this estate redefines modern desert luxury. Organic limestone, rammed earth textures, and extensive reflecting ponds create a serene microclimate, while the championship golf course provides a lush endless green backdrop.",
    specs: {
      plotSize: "32,000 sq.ft",
      builtYear: "2024",
      view: "Montgomerie Fairway & Dubai Marina Skyline",
      parking: "8 Covered Vehicles",
      finishes: "Hand-rammed Earth, Fossil Limestone, Aged Bronze"
    },
    lifestylePerks: [
      "Natural Biological Swimming Lagoon",
      "Olive Grove Courtyard (200-Year-Old Trees)",
      "Independent Wellness Pavilion & Hammam",
      "Dedicated Security Gatehouse & Annex",
      "Gated Double-Access Enclave"
    ],
    createdAt: "2026-01-22T10:00:00.000Z"
  },
  {
    id: "estate-harbour-residence",
    title: "The Marina Riviera Penthouse",
    name: "The Marina Riviera Penthouse",
    type: "Waterfront Residence",
    category: "rent",
    location: "Dubai Harbour",
    area: "Dubai Harbour Marina Basin",
    priceAED: 3850000,
    price: 3850000,
    isRent: true,
    bedrooms: 4,
    bathrooms: 5,
    areaSqFt: 6400,
    size: 6400,
    image: "/images/yacht_lifestyle.jpg",
    heroImage: "/images/yacht_lifestyle.jpg",
    gallery: [
      "/images/yacht_lifestyle.jpg",
      "/images/jumeirah_bay_island.jpg",
      "/images/penthouse_interior.jpg"
    ],
    status: "Available for Lease",
    isSignature: false,
    tagline: "Mediterranean yachting elegance overlooking the superyacht basin and Marina skyline.",
    description: "An exceptional rental opportunity for global executives and seasonal residents. Fully furnished by Poliform with panoramic wraparound glass terraces, expansive outdoor dining, and direct elevator access to the premier yacht club promenade.",
    overview: "An exceptional rental opportunity for global executives and seasonal residents. Fully furnished by Poliform with panoramic wraparound glass terraces, expansive outdoor dining, and direct elevator access to the premier yacht club promenade.",
    specs: {
      plotSize: "Single Level Flow-Through",
      builtYear: "2024",
      view: "Dubai Marina Skyline, Bluewaters & Ain Dubai",
      parking: "3 Reserved Parking Bays",
      finishes: "Bleached Teak, Statuario Marble, Linen Wallcoverings"
    },
    lifestylePerks: [
      "Direct Yacht Club Membership Included",
      "Weekly Housekeeping & Chauffeur Services",
      "Private Heated Plunge Pool on Deck",
      "Walk to Michelin-Starred Coastal Dining",
      "Seasonal or Multi-Year Flexible Terms"
    ],
    createdAt: "2026-01-25T10:00:00.000Z"
  },
  {
    id: "estate-dubai-hills",
    title: "The Pavilion at Dubai Hills",
    name: "The Pavilion at Dubai Hills",
    type: "Modern Minimalist Villa",
    category: "sale",
    location: "Dubai Hills",
    area: "Dubai Hills Parkway Vistas",
    priceAED: 54000000,
    price: 54000000,
    isRent: false,
    bedrooms: 5,
    bathrooms: 6,
    areaSqFt: 12000,
    size: 12000,
    image: "/images/villa_exterior.jpg",
    heroImage: "/images/villa_exterior.jpg",
    gallery: [
      "/images/villa_exterior.jpg",
      "/images/desert_estate.jpg",
      "/images/jumeirah_bay_island.jpg"
    ],
    status: "Exclusive Listing",
    isSignature: false,
    tagline: "Sculptural architecture nestled within the verdant green heart of the city.",
    description: "A study in geometric balance and tranquil natural illumination. Featuring sunken fire lounges, double-height art galleries, and floor-to-ceiling sliding glass walls that dissolve boundaries between interior living and manicured private grounds.",
    overview: "A study in geometric balance and tranquil natural illumination. Featuring sunken fire lounges, double-height art galleries, and floor-to-ceiling sliding glass walls that dissolve boundaries between interior living and manicured private grounds.",
    specs: {
      plotSize: "16,500 sq.ft",
      builtYear: "2025",
      view: "Championship Golf Course & Burj Khalifa Silhouette",
      parking: "4 Climatized Bays",
      finishes: "Off-White Concrete, Brushed Brass, Silk Marble"
    },
    lifestylePerks: [
      "Attractive Construction Payment Plan",
      "King's College Hospital Proximity (4 min)",
      "Championship Clubhouse Privileges",
      "Internal Sculpture Garden & Atrium",
      "10-Year UAE Golden Visa Eligibility"
    ],
    createdAt: "2026-01-28T10:00:00.000Z"
  }
];

function getStoredProperties() {
  try {
    const raw = localStorage.getItem(PROPERTIES_STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
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
