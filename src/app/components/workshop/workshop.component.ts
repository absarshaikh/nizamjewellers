import { Component } from '@angular/core';

@Component({
  selector: 'app-workshop',
  standalone: true,
  template: `
  <section class="py-16 px-6 text-center">
    <h2 class="text-3xl font-bold text-gold">Our Workshop</h2>

    <div class="grid md:grid-cols-3 gap-6 mt-10">
      <img src="assets/work1.jpg" class="rounded-xl">
      <img src="assets/work2.jpg" class="rounded-xl">
      <img src="assets/work3.jpg" class="rounded-xl">
    </div>
  </section>
  `
})
export class WorkshopComponent {}