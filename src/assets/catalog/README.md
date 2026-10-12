# Product catalog (dynamic images)

## Quick start

1. Put images here:

```
src/assets/catalog/images/rings/
  ring-001-gold.png
  ring-001-wtgold.png
  ring-001-rsgold.png
  ring-001.jpg          ← optional thumbnail for listing
  ring-002-gold.png
  ...
```

2. Generate JSON:

```bash
npm run catalog:generate
```

3. Refresh the app. Listing and detail pages read `products.json`.

## Naming rules

| Part | Example |
|------|---------|
| Category folder | `rings`, `bracelets`, `lockets`, `bangles`, `chains` |
| Product id | `ring-001`, `solitaire-halo` |
| Metal variants | `{id}-gold.png`, `{id}-wtgold.png`, `{id}-rsgold.png` |
| Listing image | `{id}.jpg` or first `-gold` file |

## Optional: edit JSON by hand

After generate, you can edit `products.json` to set `name`, `desc`, and `tag` per item.
Re-run `catalog:generate` only when you add/rename image files (it overwrites the `products` array).

## You do not need to send the folder to anyone

Keep images in this repo (or CI). Run the script locally whenever the folder changes.
