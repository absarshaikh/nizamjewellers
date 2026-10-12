export interface ProductCategory {
  id: string;
  name: string;
  desc: string;
  image: string;
}

export interface ProductMetalImages {
  gold?: string;
  wtgold?: string;
  rsgold?: string;
}

export interface CatalogProduct {
  id: string;
  categoryId: string;
  name: string;
  desc: string;
  /** Listing / card thumbnail */
  image: string;
  tag?: string;
  metals?: ProductMetalImages;
}

export interface ProductCatalogFile {
  version: number;
  generatedAt?: string;
  categories: ProductCategory[];
  products: CatalogProduct[];
}
