import { isAuthenticated } from './auth.js';
import { db } from '../firebase-config.js';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';

/**
 * Vision of Excellence — Client Enquiry & Lead Vault Service
 * Connected to live Cloud Firestore (voe-luxury-real-estate) with resilient local vault
 */

const LEADS_VAULT_KEY = 'voe_leads_vault_v3';

// Sample initial leads
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
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
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
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString()
  },
  {
    id: 'enq_demo_03',
    fullName: 'Genevieve Vance',
    email: 'gvance@vancecap.com',
    phone: '+1 212 555 0192',
    type: 'Investment Strategy Advisory',
    budget: 'AED 10M+',
    propertyTitle: 'Portfolio Yield Allocation',
    notes: 'Evaluating prime freehold assets for institutional tax-free yield. Needs quarterly yield simulation model.',
    status: 'qualified',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  }
];

function getLocalVault() {
  try {
    const raw = localStorage.getItem(LEADS_VAULT_KEY);
    if (raw) return JSON.parse(raw);
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
 */
export function exportEnquiriesToCSV(enquiries) {
  if (!enquiries || enquiries.length === 0) {
    alert('No enquiries available to export.');
    return;
  }

  const headers = ['Enquiry ID', 'Received Date', 'Client Name', 'Email', 'Phone', 'Type', 'Target Property', 'Budget / Scope', 'Status', 'Client Notes'];
  const rows = enquiries.map(e => [
    `"${e.id}"`,
    `"${new Date(e.createdAt || Date.now()).toLocaleString()}"`,
    `"${(e.fullName || '').replace(/"/g, '""')}"`,
    `"${(e.email || '').replace(/"/g, '""')}"`,
    `"${(e.phone || '').replace(/"/g, '""')}"`,
    `"${(e.type || '').replace(/"/g, '""')}"`,
    `"${(e.propertyTitle || '').replace(/"/g, '""')}"`,
    `"${(e.budget || '').replace(/"/g, '""')}"`,
    `"${(e.status || '').toUpperCase()}"`,
    `"${(e.notes || '').replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `Vision_of_Excellence_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const WHATSAPP_PHONE = '971585673050';

/**
 * Redirects or opens WhatsApp with the formatted enquiry message
 */
export function openWhatsAppEnquiry(message) {
  if (!message) return;
  const cleanPhone = WHATSAPP_PHONE.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  
  try {
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }
  } catch (err) {
    window.location.href = url;
  }
}
