import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-custom-design',
  imports: [FormsModule],
  template: `
  <section class="py-16 px-6 max-w-2xl mx-auto">
    <h2 class="text-3xl text-gold font-bold text-center">
      Design Your Own Jewelry
    </h2>

    <form class="mt-8 space-y-4">
      <input type="text" placeholder="Full Name"
        class="w-full p-3 rounded bg-[#111]">

      <input type="text" placeholder="WhatsApp Number"
        class="w-full p-3 rounded bg-[#111]">

      <input type="file"
        class="w-full p-3 rounded bg-[#111]">

      <textarea placeholder="Describe your design"
        class="w-full p-3 rounded bg-[#111]"></textarea>

      <button class="w-full bg-gold text-black py-3 rounded-lg">
        Request Quote
      </button>
    </form>
  </section>
  `
})
export class CustomDesignComponent {}