const euro = new Set('AD AT BE BG CY DE EE ES FI FR GR HR IE IT LT LU LV MC ME MT NL PT SI SK SM VA XK'.split(' '));
const markets = Object.fromEntries('AE:AED US:USD IN:INR GB:GBP CA:CAD AU:AUD NZ:NZD CH:CHF NO:NOK SE:SEK DK:DKK PL:PLN CZ:CZK HU:HUF RO:RON TR:TRY SA:SAR QA:QAR KW:KWD BH:BHD OM:OMR PK:PKR BD:BDT LK:LKR NP:NPR CN:CNY HK:HKD JP:JPY KR:KRW SG:SGD MY:MYR ID:IDR TH:THB PH:PHP VN:VND TW:TWD MX:MXN BR:BRL AR:ARS CL:CLP CO:COP PE:PEN ZA:ZAR NG:NGN KE:KES EG:EGP MA:MAD IL:ILS JO:JOD RU:RUB UA:UAH KZ:KZT'.split(' ').map(pair => pair.split(':')));
let rates;
let expiresAt = 0;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method === 'GET') {
    const country = /^[A-Z]{2}$/.test(req.headers['x-vercel-ip-country']) ?
      req.headers['x-vercel-ip-country'] : 'AE';
    const currency = euro.has(country) ? 'EUR' : markets[country] || 'AED';
    if (currency !== 'AED' && Date.now() >= expiresAt) {
      try {
        const response = await fetch('https://open.er-api.com/v6/latest/AED', {signal:AbortSignal.timeout(3500)});
        const data = await response.json();
        if (response.ok && data.result === 'success') {
          rates = data.rates;
          expiresAt = Date.now() + 3600000;
        }
      } catch {}
    }
    return res.status(200).json({country, currency, rate:currency === 'AED' ? 1 : rates?.[currency]});
  }
  if (req.method !== 'POST') return res.status(405).end();
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({error:'Invalid JSON'});
  }
  const field = (key, limit) => typeof body?.[key] === 'string' ? body[key].trim().slice(0,limit) : '';
  const lead = {name:field('name',100), phone:field('phone',20), email:field('email',254),
    unit:field('unit',100), contact:field('contact',12)};
  if (!lead.name || !/^\+[1-9]\d{7,14}$/.test(lead.phone) ||
      !['website','call','whatsapp'].includes(lead.contact)) {
    return res.status(400).json({error:'Invalid enquiry'});
  }
  const {SUKOON_LEADS_WEBHOOK, SUKOON_LEADS_SECRET} = process.env;
  if (!SUKOON_LEADS_WEBHOOK || !SUKOON_LEADS_SECRET) {
    return res.status(503).json({error:'Enquiry service unavailable'});
  }
  try {
    const result = await fetch(SUKOON_LEADS_WEBHOOK, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({...lead, secret:SUKOON_LEADS_SECRET}),
      signal:AbortSignal.timeout(8000),
    });
    const receipt = await result.json();
    if (result.ok && receipt.saved) return res.status(201).json({saved:true});
  } catch {}
  return res.status(502).json({error:'Could not confirm enquiry'});
}
