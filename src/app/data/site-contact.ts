/**
 * Single source for phone, address, and public site URL (SEO, footer, WhatsApp).
 * Update these when the shop details or custom domain change.
 */
export const SITE_CONTACT = {
  brandName: 'Nizam Jewellers',
  city: 'Mumbai',
  region: 'Maharashtra',
  country: 'IN',

  /** Display format */
  phoneDisplay: '+91 80973 55605',
  /** Shown in footer as plain text (not a mailto link) */
  emailDisplay: '',
  /** E.164 without + for wa.me */
  whatsappNumber: '918097355605',
  telHref: 'tel:+918097355605',

  addressLine1: 'Mumbai',
  addressLine2: 'Maharashtra, India',
  postalCode: '',

  /** Google Maps “Share → Embed” iframe src — replace with your showroom embed */
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995762731!3d19.08219784058543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648caf!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',

  hours: [
    { days: 'Mon – Sat', time: '10:00 AM – 8:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],

  /** Canonical production URL (sitemap, OG). Change when you use a custom domain. */
  siteUrl: 'https://nizamjewellers.vercel.app',

  /** Social / link preview image (absolute URL built at runtime) */
  ogImagePath: 'assets/images/product/ring.jpg',

  defaultWhatsAppMessage:
    'Hello Nizam Jewellers, I would like to enquire about your jewellery collection.',

  /** Full profile URLs — replace `#` with your Instagram / Facebook page links */
  social: {
    instagram: '#',
    facebook: '#',
  },
};

export function whatsAppUrl(text?: string): string {
  const msg = text ?? SITE_CONTACT.defaultWhatsAppMessage;
  return `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function absoluteUrl(path: string): string {
  const base = SITE_CONTACT.siteUrl.replace(/\/$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}
