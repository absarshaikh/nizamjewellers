import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'], // 👈 NO MORE MISSING CSS
})
export class ProductDetailComponent {
  productId: any;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('Product ID:', id);

    this.loadProduct(id);
    this.selectColor('Yellow Gold')
  }
  categories = ['Ring', 'Pendant', 'Earring', 'Bracelet'];
  selectedCategory = 'Ring';

  colors = ['Yellow Gold', 'White Gold', 'Rose Gold'];
  purity = ['14K', '18K', '22K'];

  selectedColor = 'Yellow Gold';
  selectedPurity = '18K';
  size = '';

  selectedProduct = {
    name: 'Elegant Ring',
    image: 'assets/products/ring.jpg',
  };

  selectColor(c: string) {
    console.log(this.productId)
    if (c == 'Yellow Gold') {
      this.selectedProduct.image =
        'assets/images/product/' + this.productId+'-gold' + '.png';
    } else if (c == 'Rose Gold') {
      this.selectedProduct.image =
        'assets/images/product/' + this.productId+'-rsgold' + '.png';
    } else {
      this.selectedProduct.image =
        'assets/images/product/' + this.productId+'-wtgold' + '.png';
    }
    console.log(c);
    this.selectedColor = c;
  }
  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

  // getQuote() {
  //   const message = `
  //     Product: ${this.selectedProduct.name}
  //     Category: ${this.selectedCategory}
  //     Color: ${this.selectedColor}
  //     Purity: ${this.selectedPurity}
  //     Size: ${this.size}
  //   `;

  //   window.open(
  //     `https://wa.me/8097355605?text=${encodeURIComponent(message)}`,
  //     '_blank',
  //   );
  // }

  getQuote() {
    const imageUrl = window.location.origin + '/' + this.selectedProduct.image;

    const message = `
🟡 Nizam Jewellers Inquiry

Product: ${this.selectedProduct.name}
Category: ${this.selectedCategory}
Color: ${this.selectedColor}
Purity: ${this.selectedPurity}
Size: ${this.size}

Image: ${imageUrl}
  `;

    window.open(
      `https://wa.me/8097355605?text=${encodeURIComponent(message)}`,
      '_blank',
    );
  }
  products: any = {
    ring: {
      name: 'Elegant Ring',
      image: 'assets/images/product/ring.jpg',
      // image: 'assets/images/product/ring.jpg'
    },
    bracelet: {
      name: 'Luxury Bracelet',
      image: 'assets/images/product/bracelet.jpg',
    },
    locket: {
      name: 'Classic Locket',
      image: 'assets/images/product/locket.jpg',
    },
    bangle: {
      name: 'Designer Bangle',
      image: 'assets/images/product/bangle.jpg',
    },
    chain: {
      name: 'Gold Chain',
      image: 'assets/images/product/chain.jpg',
    },
  };

  loadProduct(id: any) {
    this.selectedProduct = this.products[id];
    this.productId= id 
  }
}
