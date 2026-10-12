import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, shareReplay, tap } from 'rxjs';
import {
  CatalogProduct,
  ProductCatalogFile,
  ProductCategory,
} from '../data/product-catalog.model';

const CATALOG_URL = 'assets/catalog/products.json';

@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  private readonly http = inject(HttpClient);
  private catalog$?: Observable<ProductCatalogFile>;

  load(): Observable<ProductCatalogFile> {
    if (!this.catalog$) {
      this.catalog$ = this.http.get<ProductCatalogFile>(CATALOG_URL).pipe(
        catchError(() => of(this.fallbackCatalog())),
        tap((c) => {
          if (!c.products?.length) {
            console.warn(
              'Product catalog empty — add images under assets/catalog/images and run npm run catalog:generate',
            );
          }
        }),
        shareReplay(1),
      );
    }
    return this.catalog$;
  }

  getProducts(): Observable<CatalogProduct[]> {
    return this.load().pipe(map((c) => c.products ?? []));
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.load().pipe(map((c) => c.categories ?? []));
  }

  getProduct(id: string): Observable<CatalogProduct | undefined> {
    return this.getProducts().pipe(
      map((list) => list.find((p) => p.id === id)),
    );
  }

  getCategoryLabel(categoryId: string): string {
    const labels: Record<string, string> = {
      all: 'All',
      ring: 'Rings',
      bracelet: 'Bracelets',
      locket: 'Lockets',
      bangle: 'Bangles',
      chain: 'Chains',
    };
    return labels[categoryId] ?? 'Products';
  }

  getBaseProductId(catalogId: string, product?: CatalogProduct): string {
    return product?.categoryId ?? catalogId.split('-')[0] ?? catalogId;
  }

  metalImage(
    product: CatalogProduct,
    color: string,
    fallbackBaseId: string,
  ): string {
    const key =
      color === 'Yellow Gold'
        ? 'gold'
        : color === 'Rose Gold'
          ? 'rsgold'
          : 'wtgold';

    const fromCatalog = product.metals?.[key as keyof typeof product.metals];
    if (fromCatalog) {
      return fromCatalog;
    }

    return `assets/images/product/${fallbackBaseId}-${key}.png`;
  }

  private fallbackCatalog(): ProductCatalogFile {
    return {
      version: 1,
      categories: [],
      products: [],
    };
  }
}
