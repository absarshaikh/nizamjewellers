
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {

  activeIndex: number | null = null;
  searchTerm = '';

  faqs: FaqItem[] = [

    // GENERAL
    {
      category: 'General',
      question: 'Who is Nizam Jewellers?',
      answer:
        'Nizam Jewellers is a fine jewellery manufacturer with over 20 years of experience in craftsmanship. We combine traditional jewellery-making techniques with modern aesthetics to create timeless pieces.'
    },

    {
      category: 'General',
      question: 'Do you manufacture your jewellery?',
      answer:
        'Yes. We take pride in our manufacturing process and create our jewellery through skilled craftsmanship, from initial design through finishing and polishing.'
    },

    // DIAMONDS
    {
      category: 'Diamonds',
      question: 'Are your diamonds GIA certified?',
      answer:
        'Diamonds supplied with a GIA grading report are accompanied by their corresponding GIA documentation. Certification availability depends on the individual diamond.'
    },

    {
      category: 'Diamonds',
      question: 'Can I choose the diamond size?',
      answer:
        'Yes. Diamond size can be discussed according to your preferred design, budget, and requirements. Our diamond visualisation tool can also help you understand how different sizes look on a hand.'
    },

    {
      category: 'Diamonds',
      question: 'Can I choose a different diamond shape?',
      answer:
        'Yes. Depending on the design, you can explore different diamond shapes such as round, oval, and square.'
    },

    // PRICING
    {
      category: 'Pricing',
      question: 'How is the price of jewellery calculated?',
      answer:
        'The final price depends on factors such as gold purity and weight, diamond or gemstone specifications, craftsmanship, and other applicable costs. We provide clarity about the components that contribute to the final price.'
    },

    {
      category: 'Pricing',
      question: 'Do you have hidden charges?',
      answer:
        'We believe in transparent pricing. The applicable components of the jewellery price are explained before you proceed with your purchase.'
    },

    {
      category: 'Pricing',
      question: 'Can I get a quote before ordering?',
      answer:
        'Yes. You can request a quote for a particular design or customise the specifications according to your requirements before placing an order.'
    },

    // CUSTOM DESIGN
    {
      category: 'Custom Design',
      question: 'Can I design my own jewellery?',
      answer:
        'Yes. You can discuss your preferred design, jewellery type, metal, diamond specifications, and other requirements with us. Our team can then help develop the piece according to your requirements.'
    },

    {
      category: 'Custom Design',
      question: 'Can I customise an existing design?',
      answer:
        'Yes. Depending on the design, elements such as diamond size, shape, metal colour, and other specifications may be customised.'
    },

    // DELIVERY
    {
      category: 'Delivery',
      question: 'How will my jewellery be delivered?',
      answer:
        'Orders are handled through our delivery partner, Sequel Logistics, for secure transportation.'
    },

    {
      category: 'Delivery',
      question: 'Do you deliver across India?',
      answer:
        'Delivery availability depends on the destination and order requirements. Please contact us with your location to confirm delivery arrangements.'
    },

    {
      category: 'Delivery',
      question: 'Is my jewellery securely packaged?',
      answer:
        'Jewellery is prepared and packaged carefully before being handed over for delivery.'
    },

    // ORDERS
    {
      category: 'Orders',
      question: 'How can I place an order?',
      answer:
        'You can enquire about a product through our website and request a quote. Our team will assist you with the specifications, pricing, and next steps.'
    },

    {
      category: 'Orders',
      question: 'Can I request changes after placing an order?',
      answer:
        'Changes depend on the stage of production and the nature of the requested modification. Please contact us as soon as possible if you need to make a change.'
    },

    {
      category: 'Orders',
      question: 'How can I contact Nizam Jewellers?',
      answer:
        'You can contact us through the contact details provided on our website. For product enquiries, please mention the product or design you are interested in so our team can assist you efficiently.'
    }
  ];

  get filteredFaqs(): FaqItem[] {
    const search = this.searchTerm.trim().toLowerCase();

    if (!search) {
      return this.faqs;
    }

    return this.faqs.filter(faq =>
      faq.question.toLowerCase().includes(search) ||
      faq.answer.toLowerCase().includes(search) ||
      faq.category.toLowerCase().includes(search)
    );
  }

  toggleFaq(index: number): void {
    this.activeIndex =
      this.activeIndex === index ? null : index;
  }
}