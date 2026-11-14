const dialog = document.querySelector('#contactDialog');
const businessPhone = '971585673050';
const mainForm = document.querySelector('#leadForm');
const contactForm = document.querySelector('#contactForm');
let contactMode;
let dialingCode = '+971';
let phoneRegion = 'AE';
let phoneLibrary;

for (const trigger of document.querySelectorAll('[data-contact]')) {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    contactMode = trigger.dataset.contact;
    document.querySelector('#contactTitle').textContent =
      contactMode === 'call' ? 'Call VOE Properties' : 'Continue to WhatsApp';
    dialog.showModal();
  });
}
document.querySelector('#closeContact').onclick = () => dialog.close();

for (const form of [mainForm, contactForm]) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const contact = form === contactForm ? contactMode : 'website';
    const values = Object.fromEntries(new FormData(form));
    const status = form.querySelector('[role=status]');
    const submit = form.querySelector('[type=submit]');
    let phone = values.phone.trim();
    if (!phone.startsWith('+')) {
      phone = phoneLibrary?.parsePhoneNumberFromString(phone, phoneRegion)?.number ??
        (dialingCode + phone.replace(/^0/, ''));
    }
    phone = phone.replace(/[\s().-]/g, '');
    if (!values.name.trim() || !/^\+[1-9]\d{7,14}$/.test(phone)) {
      status.textContent = 'Enter your name and a valid phone number, including the country code.';
      return;
    }
    submit.disabled = true;
    status.textContent = 'Saving your enquiry…';
    try {
      const response = await fetch('/api/sukoon-enquiry', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({...values, phone, contact}),
      });
      if (!response.ok) throw new Error('Enquiry failed');
      form.reset();
      if (contact === 'website') {
        form.hidden = true;
        document.querySelector('#formSuccess').classList.remove('hidden');
      } else {
        const destination = contact === 'call' ? 'tel:+' + businessPhone :
          'https://wa.me/' + businessPhone + '?text=' +
          encodeURIComponent('Hi VOE Properties, I am interested in Sukoon by Sanzen.');
        const link = document.createElement('a');
        link.href = destination;
        link.textContent = contact === 'call' ? 'Tap here to call' : 'Tap here to open WhatsApp';
        status.replaceChildren('Enquiry saved. ', link);
        window.location.href = destination;
      }
    } catch {
      status.textContent = 'We could not save the enquiry. Please try again.';
    } finally {
      submit.disabled = false;
    }
  });
}

const amounts = {'AED 207,000':207000, 'AED 207K':207000, 'AED 2.07M':2070000,
  'AED 2 Million':2000000, 'AED 4.5M–6M':[4500000,6000000]};
const prices = /AED (?:207,000|207K|2\.07M|2 Million|4\.5M–6M)/g;
async function localize() {
  const response = await fetch('/api/sukoon-enquiry');
  if (!response.ok) return;
  const {country, currency, rate} = await response.json();
  const prefix = await import('https://esm.sh/libphonenumber-js@1.12.24').then(library => {
    phoneLibrary = library;
    return '+' + library.getCountryCallingCode(country);
  }).catch(() => ({AE:'+971',US:'+1',IN:'+91',GB:'+44',DE:'+49',FR:'+33'}[country]));
  if (prefix) {
    dialingCode = prefix;
    phoneRegion = country;
  }
  for (const input of document.querySelectorAll('input[type=tel]')) {
    input.placeholder = dialingCode + ' …';
  }
  if (currency === 'AED' || !(rate > 0)) return;
  const format = new Intl.NumberFormat(undefined, {
    style:'currency', currency, currencyDisplay:'code', maximumFractionDigits:0,
  });
  const convert = amount => format.format(Math.round(amount * rate));
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    if (node.parentElement.closest('script,style')) continue;
    node.textContent = node.textContent.replace(prices, match => {
      const amount = amounts[match];
      return Array.isArray(amount) ? amount.map(convert).join(' – ') : convert(amount);
    });
  }
  document.querySelector('#exchangeNote').hidden = false;
}
localize().catch(() => {});
