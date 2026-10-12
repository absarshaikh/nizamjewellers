import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { SITE_CONTACT, whatsAppUrl } from '../../data/site-contact';
import { ContactService, ContactFormPayload } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  readonly contact = SITE_CONTACT;
  readonly whatsAppHref = whatsAppUrl();

  readonly subjects = [
    'General enquiry',
    'Product question',
    'Custom design',
    'Visit the showroom',
    'Order / delivery',
    'Other',
  ];

  form: ContactFormPayload = {
    name: '',
    email: '',
    phone: '',
    subject: 'General enquiry',
    message: '',
  };

  formError = '';
  success = false;
  sending = false;

  constructor(private contactService: ContactService) {}

  submit(): void {
    this.formError = '';
    this.success = false;

    const name = this.form.name.trim();
    const email = this.form.email.trim();
    const phoneDigits = this.form.phone.replace(/\D/g, '');
    const phone =
      phoneDigits.length === 12 && phoneDigits.startsWith('91')
        ? phoneDigits.slice(2)
        : phoneDigits;
    const message = this.form.message.trim();

    if (!name) {
      this.formError = 'Please enter your name.';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.formError = 'Please enter a valid email address.';
      return;
    }
    if (phone.length !== 10) {
      this.formError = 'Please enter a valid 10-digit mobile number.';
      return;
    }
    if (message.length < 10) {
      this.formError = 'Please add a bit more detail in your message.';
      return;
    }

    const payload: ContactFormPayload = {
      name,
      email,
      phone: `+91 ${phone}`,
      subject: this.form.subject,
      message,
    };

    this.sending = true;
    this.contactService
      .submit(payload)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: () => {
          this.success = true;
          this.form = {
            name: '',
            email: '',
            phone: '',
            subject: 'General enquiry',
            message: '',
          };
        },
        error: (err) => {
          const msg =
            err.error?.error ??
            'Could not send your message. Please call or WhatsApp us instead.';
          this.formError = msg;
        },
      });
  }
}
