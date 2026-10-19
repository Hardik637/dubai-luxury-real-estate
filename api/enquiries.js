import { loadData, saveData } from './_db.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const enquiries = await loadData('enquiries', []);

    if (req.method === 'GET') {
      return res.status(200).json({ success: true, enquiries });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const newEnquiry = {
        id: body.id || `enq_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        fullName: (body.fullName || body.name || 'Anonymous Principal').trim(),
        email: (body.email || body.contact || '').trim(),
        phone: (body.phone || body.contact || '').trim(),
        type: body.type || 'Private Enquiry',
        propertyId: body.propertyId || '',
        propertyTitle: body.propertyTitle || body.propertyName || '',
        budget: body.budget || body.intent || 'High Net Worth',
        notes: body.notes || body.message || '',
        status: body.status || 'new',
        createdAt: new Date().toISOString()
      };

      enquiries.unshift(newEnquiry);
      await saveData('enquiries', enquiries);

      return res.status(201).json({ success: true, id: newEnquiry.id, enquiry: newEnquiry });
    }

    if (req.method === 'PATCH') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { id, status } = body;
      if (!id) {
        return res.status(400).json({ success: false, error: 'Missing enquiry id' });
      }

      const item = enquiries.find(e => e.id === id);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Enquiry not found' });
      }

      if (status) item.status = status;
      item.updatedAt = new Date().toISOString();
      await saveData('enquiries', enquiries);

      return res.status(200).json({ success: true, enquiry: item });
    }

    if (req.method === 'DELETE') {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const id = url.searchParams.get('id') || (req.body && req.body.id);
      if (!id) {
        return res.status(400).json({ success: false, error: 'Missing enquiry id' });
      }

      const filtered = enquiries.filter(e => e.id !== id);
      await saveData('enquiries', filtered);

      return res.status(200).json({ success: true, message: 'Enquiry deleted' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('API /api/enquiries error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
