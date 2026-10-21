import { isAuthenticated } from './auth.js';
import { db } from '../firebase-config.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, onSnapshot } from 'firebase/firestore';

/**
 * Vision of Excellence — Client Enquiry & Lead Vault Service
 * Connected to live Cloud Firestore (voe-luxury-real-estate) with resilient local vault
 */

const LEADS_VAULT_KEY = 'voe_leads_vault_v4';

// No demo leads by default — pure live client database
export const DEMO_ENQUIRIES = [];

function getLocalVault() {
  try {
    localStorage.removeItem('voe_leads_vault_v3');
    localStorage.removeItem('voe_leads_vault_v2');
    localStorage.removeItem('voe_leads_vault_v1');
    const raw = localStorage.getItem(LEADS_VAULT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // fallback
  }
  return [];
}

function saveLocalVault(leads) {
  localStorage.setItem(LEADS_VAULT_KEY, JSON.stringify(leads));
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

