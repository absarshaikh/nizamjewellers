import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  CatalogProduct,
  CATEGORY_FILTERS,
  getCategoryLabel,
  PRODUCT_CATALOG,
} from '../../data/products.data';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  readonly filters = CATEGORY_FILTERS;
  activeCategory = 'all';
  filteredProducts: CatalogProduct[] = PRODUCT_CATALOG;
  categoryHeading = 'All Jewellery';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const category = params.get('category') ?? 'all';
      this.setCategory(category);
    });
  }

  getCategoryLabel = getCategoryLabel;

  selectCategory(categoryId: string): void {
    void this.router.navigate(['/products'], {
      queryParams: categoryId === 'all' ? {} : { category: categoryId },
    });
  }

  private setCategory(categoryId: string): void {
    const valid = this.filters.some((f) => f.id === categoryId);
    this.activeCategory = valid ? categoryId : 'all';

    if (this.activeCategory === 'all') {
      this.filteredProducts = PRODUCT_CATALOG;
      this.categoryHeading = 'All Jewellery';
      return;
    }

    this.filteredProducts = PRODUCT_CATALOG.filter(
      (p) => p.categoryId === this.activeCategory,
    );
    this.categoryHeading = getCategoryLabel(this.activeCategory);
  }
}
