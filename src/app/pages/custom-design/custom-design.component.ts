import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { whatsAppUrl } from '../../data/site-contact';

export interface CustomDesignForm {
  fullName: string;
  phone: string;
  email: string;
  pieceType: string;
  metal: string;
  purity: string;
  diamondType: string;
  budget: string;
  occasion: string;
  timeline: string;
  sizeNotes: string;
  description: string;
  referenceFileName: string;
}

@Component({
  standalone: true,
  selector: 'app-custom-design',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './custom-design.component.html',
  styleUrls: ['./custom-design.component.scss'],
})
export class CustomDesignComponent {
  submitted = false;
  formError = '';

  readonly pieceTypes = [
    'Ring',
    'Necklace',
    'Earrings',
    'Bracelet',
    'Bangle',
    'Pendant',
    'Other',
  ];

  readonly metals = ['Yellow Gold', 'White Gold', 'Rose Gold', 'Silver', 'Platinum'];
  readonly purities = ['9K', '14K', '18K', '22K', 'Not sure'];
  readonly diamondTypes = [
    'Natural diamond',
    'Lab-grown diamond',
    'No stone',
    'Gemstone / other',
  ];
  readonly budgets = [
    'Under ₹50,000',
    '₹50,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000+',
    'Prefer to discuss',
  ];
  readonly occasions = [
    'Engagement',
    'Wedding',
    'Anniversary',
    'Daily wear',
    'Gift',
    'Other',
  ];
  readonly timelines = [
    'Flexible',
    '2–4 weeks',
    '1–2 months',
    'Urgent (please call)',
  ];

  form: CustomDesignForm = {
    fullName: '',
    phone: '',
    email: '',
    pieceType: '',
    metal: 'Yellow Gold',
    purity: '18K',
    diamondType: 'Natural diamond',
    budget: '',
    occasion: '',
    timeline: 'Flexible',
    sizeNotes: '',
    description: '',
    referenceFileName: '',
  };

  selectChip(field: keyof CustomDesignForm, value: string): void {
    this.form[field] = value;
  }

  onReferenceSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.form.referenceFileName = file?.name ?? '';
  }

  submit(): void {
    this.formError = '';
    this.submitted = false;

    const name = this.form.fullName.trim();
    const digits = this.form.phone.replace(/\D/g, '');
    const phone =
      digits.length === 12 && digits.startsWith('91')
        ? digits.slice(2)
        : digits.length === 10
          ? digits
          : '';
    const desc = this.form.description.trim();

    if (!name) {
      this.formError = 'Please enter your name.';
      return;
    }
    if (phone.length !== 10) {
      this.formError = 'Enter a valid 10-digit WhatsApp / mobile number.';
      return;
    }
    if (!this.form.pieceType) {
      this.formError = 'Choose what you would like to make.';
      return;
    }
    if (desc.length < 20) {
      this.formError = 'Add a short design description (at least 20 characters).';
      return;
    }

    const lines = [
      '🟡 Custom design request — Nizam Jewellers',
      '',
      `Name: ${name}`,
      `Phone: +91 ${phone}`,
      this.form.email.trim() ? `Email: ${this.form.email.trim()}` : '',
      '',
      `Piece: ${this.form.pieceType}`,
      `Metal: ${this.form.metal}`,
      `Purity: ${this.form.purity}`,
      `Stone: ${this.form.diamondType}`,
      this.form.budget ? `Budget: ${this.form.budget}` : '',
      this.form.occasion ? `Occasion: ${this.form.occasion}` : '',
      `Timeline: ${this.form.timeline}`,
      this.form.sizeNotes.trim() ? `Size / fit: ${this.form.sizeNotes.trim()}` : '',
      '',
      'Design brief:',
      desc,
      this.form.referenceFileName
        ? `\nReference file (attach in chat): ${this.form.referenceFileName}`
        : '',
    ].filter(Boolean);

    window.open(whatsAppUrl(lines.join('\n')), '_blank');
    this.submitted = true;
  }
}
