import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { SITE_CONTACT, whatsAppUrl } from '../../data/site-contact';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly contact = SITE_CONTACT;
  readonly whatsAppHref = whatsAppUrl();
  readonly mapsEmbedUrl: SafeResourceUrl;

  readonly instagramHref = SITE_CONTACT.social.instagram;
  readonly facebookHref = SITE_CONTACT.social.facebook;

  constructor(sanitizer: DomSanitizer) {
    this.mapsEmbedUrl = sanitizer.bypassSecurityTrustResourceUrl(
      SITE_CONTACT.mapsEmbedUrl,
    );
  }

  socialLinkOpensNewTab(platform: 'instagram' | 'facebook'): boolean {
    const url = SITE_CONTACT.social[platform];
    return !!url && url !== '#' && url.startsWith('http');
  }
}
