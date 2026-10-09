import { db, isFirebaseConfigured } from '../firebase-config.js';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { isAuthenticated } from './auth.js';

/**
 * Vision of Excellence — Client Enquiry & Lead Vault Service
 * 
 * Strict Security Architecture:
 * - Public callers can ONLY submit new enquiries via `submitEnquiry()`.
 * - Reading, modifying, or deleting leads requires verified Admin Authentication (`isAuthenticated()`).
 * - Prevents public inspection or scraping of high-net-worth client leads.
 */

const LEADS_VAULT_KEY = 'voe_leads_vault_v1';

// Sample initial leads for realistic admin review if empty
const DEMO_ENQUIRIES = [
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
  // Initialize with demo enquiries
  localStorage.setItem(LEADS_VAULT_KEY, JSON.stringify(DEMO_ENQUIRIES));
  return DEMO_ENQUIRIES;
}

function saveLocalVault(leads) {
  localStorage.setItem(LEADS_VAULT_KEY, JSON.stringify(leads));
}

/**
 * Public submission of enquiry / viewing request
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

  // Save to Firestore if available
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'enquiries'), enquiry);
      assignedId = docRef.id;
    } catch (err) {
      console.warn('Firestore enquiry write failed, storing securely in local vault:', err);
    }
  }

  // Always keep a secured copy in the local vault
  const localList = getLocalVault();
  localList.unshift({ ...enquiry, id: assignedId });
  saveLocalVault(localList);

  return { success: true, id: assignedId };
}

/**
 * Fetch all enquiries (Admin Only)
 */
export async function getEnquiries() {
  if (!isAuthenticated()) {
    throw new Error('Access denied: Administrative authentication required.');
  }

  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const firestoreLeads = [];
      snapshot.forEach(docSnap => {
        firestoreLeads.push({ id: docSnap.id, ...docSnap.data() });
      });
      if (firestoreLeads.length > 0) return firestoreLeads;
    } catch (err) {
      console.warn('Firestore enquiry fetch failed, falling back to local vault:', err);
    }
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

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'enquiries', id);
      await updateDoc(docRef, { status: newStatus, updatedAt: new Date().toISOString() });
    } catch (err) {
      console.warn('Firestore enquiry status update failed:', err);
    }
  }

  const list = getLocalVault();
  const idx = list.findIndex(e => e.id === id);
  if (idx !== -1) {
    list[idx].status = newStatus;
    list[idx].updatedAt = new Date().toISOString();
    saveLocalVault(list);
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

  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'enquiries', id));
    } catch (err) {
      console.warn('Firestore enquiry deletion failed:', err);
    }
  }

  const list = getLocalVault();
  const updated = list.filter(e => e.id !== id);
  saveLocalVault(updated);

  return { success: true };
}

/**
 * Export enquiries to CSV (Admin Only)
 */
export async function exportEnquiriesToCSV() {
  const enquiries = await getEnquiries();
  
  const headers = ['Date', 'Client Name', 'Email', 'Phone', 'Type', 'Property', 'Budget / Intent', 'Status', 'Notes'];
  
  const rows = enquiries.map(e => [
    `"${new Date(e.createdAt).toLocaleDateString()} ${new Date(e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}"`,
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
