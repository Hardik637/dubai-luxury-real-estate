const dialog = document.querySelector('#contactDialog');
const businessPhone = '971585673050';
const mainForm = document.querySelector('#leadForm');
const contactForm = document.querySelector('#contactForm');
const contactSubmit = document.querySelector('#contactSubmit');
const countryNames = new Intl.DisplayNames(['en'], {type: 'region'});
let contactMode;
let phoneLibrary;
const changedCountries = new WeakSet();

function updatePhoneCountry(select) {
  const option = select.selectedOptions[0];
  const flag = String.fromCodePoint(...Array.from(option.value, character => character.charCodeAt(0) + 127397));
  const form = select.form;
  form.querySelector('[data-dialing-code]').textContent = flag + ' ' + option.dataset.code;
  form.querySelector('input[type=tel]').placeholder =
    ({AE: '50 123 4567', US: '202 555 0123', GB: '7700 900123'})[option.value] ?? 'Local phone number';
}

for (const select of document.querySelectorAll('[data-phone-country]')) {
  select.addEventListener('change', () => {
    changedCountries.add(select);
    updatePhoneCountry(select);
  });
}
const enquiryEndpoint = 'https://script.google.com/macros/s/AKfycbzixHq3g_JgE8STqWJ3nGjOt6HSiLB51rD_18Qns7DYtucFIm0XO1nRLg3Vso7ooBag4g/exec';

async function getWebsiteChallenge() {
  const response = await fetch(enquiryEndpoint + '?submission=' + crypto.randomUUID(), {
    credentials: 'omit',
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error('Could not start enquiry');
  const {nonce, expires, proof} = await response.json();
  if (typeof proof !== 'string' || expires <= Date.now()) throw new Error('Invalid challenge');

  const encoder = new TextEncoder();
  for (let answer = 0; answer < 100000; answer++) {
    const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(proof + ':' + answer)));
    if (bytes[0] === 0 && (bytes[1] & 240) === 0) return {nonce, expires, proof, answer};
  }
  throw new Error('Could not verify enquiry');
}

const pixelId = document.querySelector('meta[name="sukoon-meta-pixel-id"]')?.content;
if (/^\d+$/.test(pixelId ?? '')) {
  if (!window.fbq) {
    const pixel = (...args) => {
      if (pixel.callMethod) pixel.callMethod(...args);
      else pixel.queue.push(args);
    };
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = '2.0';
    pixel.queue = [];
    window.fbq = window._fbq = pixel;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.append(script);
  }
  window.fbq('set', 'autoConfig', false, pixelId);
  window.fbq('init', pixelId);
  window.fbq('trackSingle', pixelId, 'PageView');
}

for (const trigger of document.querySelectorAll('[data-contact]')) {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    contactMode = trigger.dataset.contact;
    const isCall = contactMode === 'call';
    document.querySelector('#contactTitle').textContent =
      isCall ? 'Call VOE Properties' : 'Chat with VOE Properties on WhatsApp';
    document.querySelector('#contactDescription').textContent =
      isCall ? 'Speak to a property advisor about Sukoon by Sanzen.' :
        'Ask our team about current prices, availability and floor plans at Sukoon by Sanzen.';
    document.querySelector('#contactSubmitLabel').textContent = isCall ? 'Call Now' : 'Open WhatsApp';
    document.querySelector('#contactPrivacy').textContent =
      isCall ? 'We use your details to respond to your enquiry.' : 'We use your details to respond on WhatsApp.';
    contactSubmit.classList.toggle('contact-call', isCall);
    contactForm.querySelector('[role=status]').textContent = '';
    dialog.showModal();
  });
}
document.querySelector('#closeContact').onclick = () => dialog.close();

for (const form of [mainForm, contactForm].filter(Boolean)) {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const contact = form === contactForm ? contactMode : 'website';
    const values = Object.fromEntries(new FormData(form));
    const status = form.querySelector('[role=status]');
    const submit = form.querySelector('[type=submit]');
    if (submit.disabled) return;
    submit.disabled = true;
    const location = await locationReady;
    const select = form.querySelector('[data-phone-country]');
    const selectedCountry = select?.selectedOptions[0];
    const region = selectedCountry?.value ?? 'AE';
    const prefix = selectedCountry?.dataset.code ?? '+971';
    let phone = values.phone.trim().replace(/^00/, '+');
    if (!phone.startsWith('+')) {
      phone = phoneLibrary?.parsePhoneNumberFromString(phone, region)?.number ??
        (prefix + phone.replace(/^0/, ''));
    }
    phone = phone.replace(/[\s().-]/g, '');
    if (!values.name.trim() || !/^\+[1-9]\d{7,14}$/.test(phone)) {
      status.textContent = 'Enter your name and a valid phone number, including the country code.';
      submit.disabled = false;
      return;
    }
    status.textContent = 'Saving your enquiry…';
    try {
      const challenge = await getWebsiteChallenge();
      const response = await fetch(enquiryEndpoint, {
        method: 'POST',
        credentials: 'omit',
        headers: {'Content-Type': 'text/plain;charset=UTF-8'},
        body: JSON.stringify({
          ...values, phone, contact, channel: 'sukoon-website', challenge,
          visitorCountry: location?.country,
          visitorCountryName: location?.country ? countryNames.of(location.country) : undefined,
        }),
        signal: AbortSignal.timeout(20000),
      });
      if (!response.ok || (await response.json()).saved !== true) throw new Error('Enquiry failed');
      if (contact === 'website' && /^\d+$/.test(pixelId ?? '')) {
        try {
          window.fbq('trackSingle', pixelId, 'Lead');
        } catch {
          // Tracking must never interrupt a saved enquiry.
        }
      }
      form.reset();
      if (select) {
        select.value = selectedCountry.value;
        updatePhoneCountry(select);
      }
      if (contact === 'website') {
        form.hidden = true;
        const success = document.querySelector('#formSuccess');
        success.classList.remove('hidden');
        success.setAttribute('tabindex', '-1');
        success.focus();
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

const amounts = {
  'AED 2.07M': 2070000, 'AED 2.98M': 2980000, 'AED 4.06M': 4060000,
  'AED 4.60M': 4600000, 'AED 6.19M': 6190000, 'AED 2M–3M': [2000000, 3000000],
  'AED 3M–5M': [3000000, 5000000], 'AED 5M–7M': [5000000, 7000000],
  'AED 2M': 2000000, 'AED 7M': 7000000,
};
const prices = new RegExp(Object.keys(amounts).map(price => price.replace('.', '\\.')).join('|'), 'g');

const locationReady = fetch('/api/sukoon-enquiry', {signal: AbortSignal.timeout(6500)})
  .then(response => response.ok ? response.json() : null)
  .catch(() => null);

function selectDetectedCountry(select, country) {
  if (!country || changedCountries.has(select) || !Array.from(select.options).some(option => option.value === country)) return;
  select.value = country;
  updatePhoneCountry(select);
}

async function localizePhones() {
  const selects = Array.from(document.querySelectorAll('[data-phone-country]'));
  const libraryReady = import('https://esm.sh/libphonenumber-js@1.12.24').catch(() => null);
  const location = await locationReady;
  for (const select of selects) selectDetectedCountry(select, location?.country);
  phoneLibrary = await libraryReady;
  if (!phoneLibrary) return;

  const regions = phoneLibrary.getCountries().sort((first, second) => countryNames.of(first).localeCompare(countryNames.of(second)));
  for (const select of selects) {
    const existing = new Set(Array.from(select.options, option => option.value));
    for (const region of regions) {
      if (existing.has(region)) continue;
      const code = '+' + phoneLibrary.getCountryCallingCode(region);
      const option = new Option(countryNames.of(region) + ' (' + code + ')', region);
      option.dataset.code = code;
      select.add(option);
    }
    selectDetectedCountry(select, location?.country);
  }
}

async function localizePrices() {
  const location = await locationReady;
  if (!location) return;
  const {currency, rate} = location;
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
localizePrices().catch(() => {});
localizePhones().catch(() => {});
