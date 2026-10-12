export interface ProductCategory {
  id: string;
  name: string;
  desc: string;
  image: string;
}

export interface CatalogProduct {
  id: string;
  categoryId: string;
  name: string;
  desc: string;
  image: string;
  tag?: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'ring',
    name: 'Elegant Ring',
    desc: 'Diamond-studded premium ring',
    image: 'assets/images/product/ring.jpg',
  },
  {
    id: 'bracelet',
    name: 'Luxury Bracelet',
    desc: 'Modern gold bracelet design',
    image: 'assets/images/product/bracelet.jpg',
  },
  {
    id: 'locket',
    name: 'Classic Locket',
    desc: 'Timeless gold locket piece',
    image: 'assets/images/product/locket.jpg',
  },
  {
    id: 'bangle',
    name: 'Designer Bangle',
    desc: 'Traditional meets modern style',
    image: 'assets/images/product/bangle.jpg',
  },
  {
    id: 'chain',
    name: 'Gold Chain',
    desc: 'Minimal and elegant chain',
    image: 'assets/images/product/chain.jpg',
  },
];

export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    id: 'ring-classic',
    categoryId: 'ring',
    name: 'Classic Solitaire Ring',
    desc: 'Timeless solitaire with brilliant centre stone.',
    image: 'assets/images/product/ring.jpg',
    tag: 'Bestseller',
  },
  {
    id: 'ring-halo',
    categoryId: 'ring',
    name: 'Halo Diamond Ring',
    desc: 'Micro-set halo for extra sparkle and presence.',
    image: 'assets/images/product/ring.jpg',
  },
  {
    id: 'bracelet-tennis',
    categoryId: 'bracelet',
    name: 'Tennis Bracelet',
    desc: 'Continuous line of diamonds for everyday luxury.',
    image: 'assets/images/product/bracelet.jpg',
    tag: 'New',
  },
  {
    id: 'bracelet-cuff',
    categoryId: 'bracelet',
    name: 'Gold Cuff Bracelet',
    desc: 'Bold cuff profile with a clean modern finish.',
    image: 'assets/images/product/bracelet.jpg',
  },
  {
    id: 'locket-heart',
    categoryId: 'locket',
    name: 'Heart Locket',
    desc: 'Personalised keepsake with a polished frame.',
    image: 'assets/images/product/locket.jpg',
  },
  {
    id: 'locket-oval',
    categoryId: 'locket',
    name: 'Oval Heritage Locket',
    desc: 'Vintage-inspired silhouette with secure clasp.',
    image: 'assets/images/product/locket.jpg',
  },
  {
    id: 'bangle-traditional',
    categoryId: 'bangle',
    name: 'Traditional Bangle',
    desc: 'Hand-finished gold with classic proportions.',
    image: 'assets/images/product/bangle.jpg',
  },
  {
    id: 'bangle-diamond',
    categoryId: 'bangle',
    name: 'Diamond Line Bangle',
    desc: 'Sleek bangle with a row of brilliant diamonds.',
    image: 'assets/images/product/bangle.jpg',
    tag: 'Popular',
  },
  {
    id: 'chain-minimal',
    categoryId: 'chain',
    name: 'Minimal Link Chain',
    desc: 'Lightweight chain for daily wear or layering.',
    image: 'assets/images/product/chain.jpg',
  },
  {
    id: 'chain-statement',
    categoryId: 'chain',
    name: 'Statement Gold Chain',
    desc: 'Heavier links with a confident, premium look.',
    image: 'assets/images/product/chain.jpg',
  },
];

export const CATEGORY_FILTERS: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ring', label: 'Rings' },
  { id: 'bracelet', label: 'Bracelets' },
  { id: 'locket', label: 'Lockets' },
  { id: 'bangle', label: 'Bangles' },
  { id: 'chain', label: 'Chains' },
];

export function getBaseProductId(catalogId: string): string {
  const item = PRODUCT_CATALOG.find((p) => p.id === catalogId);
  return item?.categoryId ?? catalogId;
}

export function getCatalogProduct(id: string): CatalogProduct | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === id);
}

export function getCategoryLabel(categoryId: string): string {
  return CATEGORY_FILTERS.find((c) => c.id === categoryId)?.label ?? 'Products';
}
