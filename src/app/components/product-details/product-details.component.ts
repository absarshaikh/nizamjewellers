import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  getBaseProductId,
  getCatalogProduct,
  getCategoryLabel,
} from '../../data/products.data';
import { whatsAppUrl } from '../../data/site-contact';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productId = '';
  catalogId = '';
  categoryId = '';
  categoryLabel = 'Products';
  ringSizes = [
    '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22', '23', '24', '25',
    '26', '27', '28', '29', '30',
  ];
  size = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.loadProduct(id);
    this.selectColor('Yellow Gold');
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
    if (c == 'Yellow Gold') {
      this.selectedProduct.image =
        'assets/images/product/' + this.productId + '-gold.png';
    } else if (c == 'Rose Gold') {
      this.selectedProduct.image =
        'assets/images/product/' + this.productId + '-rsgold.png';
    } else {
      this.selectedProduct.image =
        'assets/images/product/' + this.productId + '-wtgold.png';
    }
    this.selectedColor = c;
  }

  selectCategory(cat: string) {
    this.selectedCategory = cat;
  }

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

    window.open(whatsAppUrl(message), '_blank');
  }

  loadProduct(id: string) {
    this.catalogId = id;
    this.productId = getBaseProductId(id);
    this.categoryId = this.productId;
    this.categoryLabel = getCategoryLabel(this.categoryId);
    const catalogItem = getCatalogProduct(id);
    if (catalogItem) {
      this.selectedProduct = {
        name: catalogItem.name,
        image: catalogItem.image,
      };
      return;
    }

    this.selectedProduct = {
      name: 'Custom Jewellery Piece',
      image: `assets/images/product/${this.productId}.jpg`,
    };
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
