import { isAuthenticated } from './auth.js';
import { db } from '../firebase-config.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';

/**
 * Vision of Excellence — Client Enquiry & Lead Vault Service
 * Connected to live Cloud Firestore (voe-luxury-real-estate) with resilient local vault
 */

const LEADS_VAULT_KEY = 'voe_leads_vault_v3';

// Sample initial leads with rich diversity
export const DEMO_ENQUIRIES = [
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

function getLocalVault() {
  try {
    const raw = localStorage.getItem(LEADS_VAULT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // fallback
  }
  localStorage.setItem(LEADS_VAULT_KEY, JSON.stringify(DEMO_ENQUIRIES));
  return DEMO_ENQUIRIES;
}

function saveLocalVault(leads) {
  localStorage.setItem(LEADS_VAULT_KEY, JSON.stringify(leads));
}

/**
 * Seed or restore rich demo enquiries (Admin action)
 */
export async function seedDemoEnquiries() {
  saveLocalVault(DEMO_ENQUIRIES);
  if (db) {
    try {
      for (const enq of DEMO_ENQUIRIES) {
        await setDoc(doc(db, 'enquiries', enq.id), enq, { merge: true });
      }
    } catch (e) {
      console.warn('Firestore demo seed notice:', e);
    }
  }
  return DEMO_ENQUIRIES;
}

/**
 * Public submission of enquiry / viewing request
 * Writes directly to live Cloud Firestore with local vault fallback
 */
export async function submitEnquiry(data) {
  const enquiry = {
    fullName: (data.fullName || data.name || 'Anonymous Principal').trim(),
    email: (data.email || data.contact || '').trim(),
    phone: (data.phone || data.contact || '').trim(),
    type: data.type || 'Private Enquiry',
    propertyId: data.propertyId || '',
    propertyTitle: data.propertyTitle || data.propertyName || '',
    budget: data.budget || data.intent || 'High Net Worth',
    notes: data.notes || data.message || '',
    status: 'new',
    createdAt: new Date().toISOString()
  };

  let assignedId = `enq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

  // 1. Immediately store in local vault as instant optimistic update
  try {
    const localList = getLocalVault();
    localList.unshift({ ...enquiry, id: assignedId });
    saveLocalVault(localList);
  } catch (e) {
    console.warn('Local vault write error:', e);
  }

  // 2. Transmit directly to live Cloud Firestore
  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'enquiries'), {
        ...enquiry,
        serverTimestamp: serverTimestamp()
      });
      if (docRef && docRef.id) {
        assignedId = docRef.id;
        console.info('✓ Live enquiry committed to Cloud Firestore:', assignedId);
      }
    } catch (fbErr) {
      console.warn('Cloud Firestore direct write notice:', fbErr.message);
    }
  }

  // 3. Forward to backend API (/api/enquiries)
  try {
    const res = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...enquiry, id: assignedId })
    });
    if (res.ok) {
      const result = await res.json();
      if (result.id) assignedId = result.id;
    }
  } catch (err) {
    // API endpoint optional
  }

  return { success: true, id: assignedId };
}

/**
 * Fetch all enquiries (Admin Only)
 * Reads from live Cloud Firestore with API & local vault fallback
 */
export async function getEnquiries() {
  if (!isAuthenticated()) {
    throw new Error('Access denied: Administrative authentication required.');
  }

  // 1. Query live Cloud Firestore directly
  if (db) {
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const leads = [];
      snapshot.forEach(docSnap => {
        leads.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (leads.length > 0) {
        saveLocalVault(leads);
        return leads;
      }
    } catch (fbErr) {
      console.warn('Cloud Firestore ordered fetch notice, trying direct collection query:', fbErr.message);
      try {
        const snapshot = await getDocs(collection(db, 'enquiries'));
        const leads = [];
        snapshot.forEach(docSnap => {
          leads.push({ id: docSnap.id, ...docSnap.data() });
        });
        leads.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        if (leads.length > 0) {
          saveLocalVault(leads);
          return leads;
        }
      } catch (fallbackErr) {
        console.warn('Firestore fallback fetch notice:', fallbackErr.message);
      }
    }
  }

  // 2. Query backend API (/api/enquiries)
  try {
    const res = await fetch('/api/enquiries');
    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.enquiries) && data.enquiries.length > 0) {
        saveLocalVault(data.enquiries);
        return data.enquiries;
      }
    }
  } catch (err) {
    console.warn('Backend /api/enquiries fetch notice, using local cache:', err.message);
  }

  return getLocalVault();
}

/**
 * Update enquiry status (Admin Only)
 */
export async function updateEnquiryStatus(id, newStatus) {
  if (!isAuthenticated()) {
    throw new Error('Access denied.');
  }

  // 1. Update local vault
  const list = getLocalVault();
  const target = list.find(e => e.id === id);
  if (target) {
    target.status = newStatus;
    target.updatedAt = new Date().toISOString();
    saveLocalVault(list);
  }

  // 2. Update Cloud Firestore
  if (db && id) {
    try {
      await updateDoc(doc(db, 'enquiries', id), {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (fbErr) {
      console.warn('Firestore status update notice:', fbErr.message);
    }
  }

  // 3. Update backend API
  try {
    await fetch('/api/enquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: newStatus })
    });
  } catch (err) {
    console.warn('Backend status update notice:', err.message);
  }

  return { success: true };
}

/**
 * Delete enquiry (Admin Only)
 */
export async function deleteEnquiry(id) {
  if (!isAuthenticated()) {
    throw new Error('Access denied.');
  }

  // 1. Update local vault
  const list = getLocalVault();
  const filtered = list.filter(e => e.id !== id);
  saveLocalVault(filtered);

  // 2. Delete from Cloud Firestore
  if (db && id) {
    try {
      await deleteDoc(doc(db, 'enquiries', id));
    } catch (fbErr) {
      console.warn('Firestore delete notice:', fbErr.message);
    }
  }

  // 3. Update backend API
  try {
    await fetch(`/api/enquiries?id=${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  } catch (err) {
    console.warn('Backend delete notice:', err.message);
  }

  return { success: true };
}

/**
 * Export enquiries as CSV (Admin Only)
 * Uses standard RFC 4180 CSV escaping, UTF-8 BOM, and Blob download
 */
export function exportEnquiriesToCSV(enquiries) {
  const data = (Array.isArray(enquiries) && enquiries.length > 0)
    ? enquiries
    : getLocalVault();

  if (!data || data.length === 0) {
    if (typeof alert !== 'undefined') {
      alert('No enquiries available to export.');
    }
    return false;
  }

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const headers = [
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

  const rows = data.map(e => {
    let dateStr = '';
    if (e.createdAt) {
      const d = new Date(e.createdAt);
      dateStr = !isNaN(d.getTime()) ? d.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }) : String(e.createdAt);
    }

    return [
      escapeCSV(e.id || ''),
      escapeCSV(dateStr),
      escapeCSV(e.fullName || e.name || 'Anonymous Client'),
      escapeCSV(e.email || ''),
      escapeCSV(e.phone || ''),
      escapeCSV(e.type || 'General Enquiry'),
      escapeCSV(e.propertyTitle || e.propertyName || ''),
      escapeCSV(e.budget || ''),
      escapeCSV((e.status || 'new').toUpperCase()),
      escapeCSV(e.notes || e.message || '')
    ].join(',');
  });

  const csvString = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');

  if (typeof Blob !== 'undefined' && typeof URL !== 'undefined' && typeof document !== 'undefined') {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.setAttribute('href', url);
    link.setAttribute('download', `Vision_of_Excellence_Leads_${dateStamp}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return csvString;
}

export const WHATSAPP_PHONE = '971585673050';

/**
 * Returns formatted WhatsApp link for an enquiry message
 */
export function getWhatsAppUrl(message) {
  const cleanPhone = WHATSAPP_PHONE.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Redirects or opens WhatsApp with the formatted enquiry message
 */
export function openWhatsAppEnquiry(message) {
  if (!message) return null;
  const url = getWhatsAppUrl(message);
  
  try {
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      // Gentle delayed fallback in case popup blocker intercepted
      setTimeout(() => {
        try {
          window.location.href = url;
        } catch (e) {
          // ignore
        }
      }, 1000);
    }
  } catch (err) {
    setTimeout(() => {
      try {
        window.location.href = url;
      } catch (e) {
        // ignore
      }
    }, 1000);
  }
  return url;
}

/**
 * Subscribe to Real-Time Enquiries (Admin Dashboard)
 * Fires immediately and whenever any new enquiry is added in Firestore
 */
export function subscribeToEnquiries(callback) {
  if (!isAuthenticated()) {
    return () => {};
  }

  if (!db) {
    callback(getLocalVault());
    return () => {};
  }

  try {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const leads = [];
      snapshot.forEach(docSnap => {
        leads.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (leads.length > 0) {
        saveLocalVault(leads);
        callback(leads);
      }
    }, (err) => {
      console.warn('Real-time snapshot ordered query notice, listening on collection:', err.message);
      try {
        return onSnapshot(collection(db, 'enquiries'), (snapshot) => {
          const leads = [];
          snapshot.forEach(docSnap => {
            leads.push({ id: docSnap.id, ...docSnap.data() });
          });
          leads.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          if (leads.length > 0) {
            saveLocalVault(leads);
            callback(leads);
          }
        });
      } catch (fallbackErr) {
        console.warn('Fallback snapshot error:', fallbackErr.message);
      }
    });
  } catch (err) {
    console.warn('subscribeToEnquiries notice:', err.message);
    callback(getLocalVault());
    return () => {};
  }
}

