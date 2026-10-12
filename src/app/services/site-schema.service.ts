import { Injectable } from '@angular/core';
import {
  absoluteUrl,
  SITE_CONTACT,
  whatsAppUrl,
} from '../data/site-contact';
import { PRODUCT_CATALOG } from '../data/products.data';

@Injectable({ providedIn: 'root' })
export class SiteSchemaService {
  private injected = false;

  injectLocalBusinessSchema(): void {
    if (this.injected || typeof document === 'undefined') {
      return;
    }
    this.injected = true;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'JewelryStore',
      name: SITE_CONTACT.brandName,
      url: SITE_CONTACT.siteUrl,
      telephone: SITE_CONTACT.phoneDisplay.replace(/\s/g, ''),
      image: absoluteUrl(SITE_CONTACT.ogImagePath),
      address: {
        '@type': 'PostalAddress',
        addressLocality: SITE_CONTACT.city,
        addressRegion: SITE_CONTACT.region,
        addressCountry: SITE_CONTACT.country,
        streetAddress: SITE_CONTACT.addressLine1,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
          ],
          opens: '10:00',
          closes: '20:00',
        },
      ],
      sameAs: [
        whatsAppUrl(),
        SITE_CONTACT.social.instagram,
        SITE_CONTACT.social.facebook,
      ].filter((url) => url && url !== '#'),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'nizam-local-business-schema';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  /** Static paths for sitemap maintenance (optional tooling). */
  static sitemapPaths(): string[] {
    const staticPaths = [
      '',
      'products',
      'custom-design',
      'try-diamond',
      'faq',
      'about',
      'contact',
    ];
    const productPaths = PRODUCT_CATALOG.map((p) => `product/${p.id}`);
    return [...staticPaths, ...productPaths];
  }
}
