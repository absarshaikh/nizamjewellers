import { Component } from '@angular/core';
import { SITE_CONTACT, whatsAppUrl } from '../../data/site-contact';

@Component({
  selector: 'app-contact-float',
  standalone: true,
  templateUrl: './contact-float.component.html',
  styleUrls: ['./contact-float.component.scss'],
})
export class ContactFloatComponent {
  readonly phoneDisplay = SITE_CONTACT.phoneDisplay;
  readonly telHref = SITE_CONTACT.telHref;
  readonly whatsAppHref = whatsAppUrl();
}
