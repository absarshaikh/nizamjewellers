import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'] 

})
export class ProductCardComponent {
  @Input() product: any;

  constructor(private router: Router) {}

  goToDetail(event: Event) {
  event.stopPropagation();
    this.router.navigate(['/product', this.product.id]);
  }
}