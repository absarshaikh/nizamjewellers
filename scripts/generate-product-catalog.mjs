/**
 * Scans src/assets/catalog/images and writes src/assets/catalog/products.json
 *
 * Folder layout (recommended):
 *   src/assets/catalog/images/rings/ring-001-gold.png
 *   src/assets/catalog/images/rings/ring-001-wtgold.png
 *   src/assets/catalog/images/rings/ring-001-rsgold.png
 *   src/assets/catalog/images/rings/ring-001.jpg   (optional listing thumb)
 *
 * Metal suffixes: -gold, -wtgold, -rsgold
 * Category folder → categoryId: rings→ring, bracelets→bracelet, lockets→locket, bangles→bangle, chains→chain
 *
 * Run: npm run catalog:generate
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imagesRoot = path.join(root, 'src/assets/catalog/images');
const outFile = path.join(root, 'src/assets/catalog/products.json');

const CATEGORY_MAP = {
  rings: 'ring',
  ring: 'ring',
  bracelets: 'bracelet',
  bracelet: 'bracelet',
  lockets: 'locket',
  locket: 'locket',
  bangles: 'bangle',
  bangle: 'bangle',
  chains: 'chain',
  chain: 'chain',
};

const METAL_SUFFIX = {
  gold: 'gold',
  wtgold: 'wtgold',
  rsgold: 'rsgold',
};

const IMAGE_EXT = /\.(png|jpe?g|webp)$/i;
const METAL_PATTERN = /^(.+)-(gold|wtgold|rsgold)$/i;

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function assetPath(absPath) {
  const rel = path.relative(path.join(root, 'src'), absPath);
  return toPosix(`assets/${rel}`);
}

function humanName(id) {
  return id
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (IMAGE_EXT.test(entry.name)) files.push(full);
  }
  return files;
}

function categoryFromPath(filePath) {
  const rel = path.relative(imagesRoot, filePath);
  const folder = rel.split(path.sep)[0]?.toLowerCase() ?? '';
  return CATEGORY_MAP[folder] ?? 'ring';
}

function buildCatalog() {
  const files = walk(imagesRoot);
  const products = new Map();

  for (const file of files) {
    const base = path.basename(file, path.extname(file));
    const metalMatch = base.match(METAL_PATTERN);

    if (metalMatch) {
      const id = metalMatch[1];
      const metalKey = METAL_SUFFIX[metalMatch[2].toLowerCase()];
      if (!metalKey) continue;

      const categoryId = categoryFromPath(file);
      if (!products.has(id)) {
        products.set(id, {
          id,
          categoryId,
          name: humanName(id),
          desc: '',
          image: '',
          metals: {},
        });
      }
      const p = products.get(id);
      p.metals[metalKey] = assetPath(file);
      if (!p.image || metalKey === 'gold') {
        p.image = assetPath(file);
      }
      continue;
    }

    const id = base;
    const categoryId = categoryFromPath(file);
    if (!products.has(id)) {
      products.set(id, {
        id,
        categoryId,
        name: humanName(id),
        desc: '',
        image: assetPath(file),
        metals: {},
      });
    } else {
      const p = products.get(id);
      p.image = assetPath(file);
    }
  }

  const list = [...products.values()].sort((a, b) => a.id.localeCompare(b.id));

  for (const p of list) {
    if (!p.image && p.metals.gold) p.image = p.metals.gold;
    if (!p.image && p.metals.wtgold) p.image = p.metals.wtgold;
    if (!p.image && p.metals.rsgold) p.image = p.metals.rsgold;
    if (Object.keys(p.metals).length === 0) delete p.metals;
  }

  return list.filter((p) => p.image);
}

function defaultCategories() {
  return [
    {
      id: 'ring',
      name: 'Rings',
      desc: 'Explore our ring designs',
      image: 'assets/images/product/ring.jpg',
    },
    {
      id: 'bracelet',
      name: 'Bracelets',
      desc: 'Bracelet collections',
      image: 'assets/images/product/bracelet.jpg',
    },
    {
      id: 'locket',
      name: 'Lockets',
      desc: 'Locket collections',
      image: 'assets/images/product/locket.jpg',
    },
    {
      id: 'bangle',
      name: 'Bangles',
      desc: 'Bangle collections',
      image: 'assets/images/product/bangle.jpg',
    },
    {
      id: 'chain',
      name: 'Chains',
      desc: 'Chain collections',
      image: 'assets/images/product/chain.jpg',
    },
  ];
}

const products = buildCatalog();
const payload = {
  version: 1,
  generatedAt: new Date().toISOString(),
  categories: defaultCategories(),
  products,
};

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(payload, null, 2), 'utf8');

console.log(`Wrote ${products.length} products → ${toPosix(path.relative(root, outFile))}`);
if (products.length === 0) {
  console.log(
    'No images found. Add files under src/assets/catalog/images/<category>/ e.g. rings/ring-001-gold.png',
  );
}
