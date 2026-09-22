import { Component, OnDestroy } from '@angular/core';
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
export class ProductDetailComponent implements OnDestroy { 
  productId: any;
  ringSizes = [
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30'
];
size = '';
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
  purity = ['9K', '14K', '18K'];

  selectedColor = 'Yellow Gold';
  selectedPurity = '18K';

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
    this.productId = id;
    this.selectedProduct = this.products[id] ?? this.selectedProduct;
  }

  ngOnDestroy(): void {
  document.body.style.overflow = '';
}

showSizeGuide = false;

openSizeGuide(): void {
  this.showSizeGuide = true;
  document.body.style.overflow = 'hidden';
}

closeSizeGuide(): void {
  this.showSizeGuide = false;
  document.body.style.overflow = '';
}

selectedDiamondType = 'Natural Diamond';

activeDiamondInfo: 'lab' | 'natural' | null = null;

showDiamondInfo(type: 'lab' | 'natural'): void {
  this.activeDiamondInfo = type;
}

hideDiamondInfo(): void {
  this.activeDiamondInfo = null;
}
  
}
