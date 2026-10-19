import { loadData, saveData } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const properties = await loadData('properties', []);

    if (req.method === 'GET') {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const id = url.searchParams.get('id');
      const signatureOnly = url.searchParams.get('signature') === 'true';

      if (id) {
        const found = properties.find(p => p.id === id);
        if (!found) return res.status(404).json({ success: false, error: 'Property not found' });
        return res.status(200).json({ success: true, property: found });
      }

      if (signatureOnly) {
        const signature = properties.filter(p => p.isSignature === true);
        return res.status(200).json({
          success: true,
          properties: signature.length > 0 ? signature : properties.slice(0, 4)
        });
      }

      return res.status(200).json({ success: true, properties });
    }

    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const isNew = !body.id;
      const id = isNew ? `estate-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 4)}` : body.id;
      const title = body.title || body.name || 'Untitled Residence';
      const priceAED = Number(body.priceAED || body.price || 0);

      const updated = {
        ...body,
        id,
        title,
        name: title,
        priceAED,
        price: priceAED,
        isRent: body.category === 'rent' || body.isRent === true,
        bedrooms: Number(body.bedrooms || 0),
        bathrooms: Number(body.bathrooms || 0),
        areaSqFt: Number(body.areaSqFt || body.size || 0),
        size: Number(body.areaSqFt || body.size || 0),
        image: body.image || body.heroImage || '/images/villa_exterior.jpg',
        heroImage: body.heroImage || body.image || '/images/villa_exterior.jpg',
        gallery: Array.isArray(body.gallery) && body.gallery.length > 0 ? body.gallery : [body.image || '/images/villa_exterior.jpg'],
        isSignature: Boolean(body.isSignature),
        status: body.status || 'Exclusive Listing',
        updatedAt: new Date().toISOString()
      };

      if (isNew) {
        updated.createdAt = new Date().toISOString();
        properties.unshift(updated);
      } else {
        const idx = properties.findIndex(p => p.id === id);
        if (idx !== -1) {
          properties[idx] = { ...properties[idx], ...updated };
        } else {
          properties.unshift(updated);
        }
      }

      await saveData('properties', properties);
      return res.status(200).json({ success: true, property: updated, id });
    }

    if (req.method === 'PUT') {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const action = url.searchParams.get('action');
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const id = url.searchParams.get('id') || body.id;

      if (!id) return res.status(400).json({ success: false, error: 'Missing property id' });
      const target = properties.find(p => p.id === id);
      if (!target) return res.status(404).json({ success: false, error: 'Property not found' });

      if (action === 'toggleSignature') {
        target.isSignature = !target.isSignature;
        target.updatedAt = new Date().toISOString();
        await saveData('properties', properties);
        return res.status(200).json({ success: true, isSignature: target.isSignature });
      }

      Object.assign(target, body, { updatedAt: new Date().toISOString() });
      await saveData('properties', properties);
      return res.status(200).json({ success: true, property: target });
    }

    if (req.method === 'DELETE') {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      const id = url.searchParams.get('id') || (req.body && req.body.id);
      if (!id) return res.status(400).json({ success: false, error: 'Missing property id' });

      const filtered = properties.filter(p => p.id !== id);
      await saveData('properties', filtered);
      return res.status(200).json({ success: true, message: 'Property deleted' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('API /api/properties error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
