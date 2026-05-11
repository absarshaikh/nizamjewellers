import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  template: `
  <section class="py-16 text-center">
    <h2 class="text-3xl text-gold font-bold">Price Transparency</h2>

    <div class="mt-8 max-w-md mx-auto space-y-4">
      <input [(ngModel)]="weight" type="number"
        class="w-full p-3 rounded bg-[#111]" placeholder="Weight">

      <input [(ngModel)]="making" type="number"
        class="w-full p-3 rounded bg-[#111]" placeholder="Making Charges">

      <div class="text-xl mt-4">
        Total: ₹{{ total }}
      </div>
    </div>
  </section>
  `
})
export class CalculatorComponent {
  goldRate = 6000;
  weight = 10;
  making = 500;

  get total() {
    return (this.goldRate * this.weight) + this.making + ((this.goldRate * this.weight) * 0.03);
  }
}