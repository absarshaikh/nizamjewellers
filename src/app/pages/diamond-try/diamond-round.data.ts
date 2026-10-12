/** Round brilliant — industry reference diameters (mm) vs carat weight */
export const ROUND_DIAMOND_SIZES: ReadonlyArray<{ carat: number; mm: number }> = [
  { carat: 0.02, mm: 1.7 },
  { carat: 0.05, mm: 2.4 },
  { carat: 0.1, mm: 3.0 },
  { carat: 0.15, mm: 3.4 },
  { carat: 0.2, mm: 3.8 },
  { carat: 0.25, mm: 4.1 },
  { carat: 0.33, mm: 4.4 },
  { carat: 0.5, mm: 5.0 },
  { carat: 0.75, mm: 5.7 },
  { carat: 1.0, mm: 6.4 },
  { carat: 1.25, mm: 6.9 },
  { carat: 1.5, mm: 7.3 },
  { carat: 1.75, mm: 7.7 },
  { carat: 2.0, mm: 8.1 },
  { carat: 2.5, mm: 8.8 },
  { carat: 3.0, mm: 9.4 },
  { carat: 3.5, mm: 10.0 },
  { carat: 4.0, mm: 10.4 },
  { carat: 4.5, mm: 10.8 },
  { carat: 5.0, mm: 11.0 },
];

/** Common retail sizes (mm ↔ ct) — matches typical size charts */
export const ROUND_SIZE_CHART_ROWS: ReadonlyArray<{ mm: number; carat: number }> = [
  { mm: 4.0, carat: 0.25 },
  { mm: 5.0, carat: 0.5 },
  { mm: 5.75, carat: 0.75 },
  { mm: 6.5, carat: 1.0 },
  { mm: 6.8, carat: 1.25 },
  { mm: 7.3, carat: 1.5 },
  { mm: 7.75, carat: 1.75 },
  { mm: 8.0, carat: 2.0 },
  { mm: 8.7, carat: 2.5 },
  { mm: 9.1, carat: 3.0 },
  { mm: 9.75, carat: 3.5 },
  { mm: 10.25, carat: 4.0 },
  { mm: 10.75, carat: 4.5 },
  { mm: 11.0, carat: 5.0 },
];

/** Bottom strip — includes smallest calibrated size (1.7 mm) */
export const HAND_COMPARE_CARATS: ReadonlyArray<number> = [
  0.02, 0.1, 0.25, 0.5, 1, 2,
];

export const MIN_CARAT = 0.02;
export const MIN_DIAMOND_MM = 1.7;

export function caratToDiameterMm(carat: number): number {
  const table = ROUND_DIAMOND_SIZES;
  if (carat <= table[0].carat) {
    return table[0].mm;
  }
  if (carat >= table[table.length - 1].carat) {
    return table[table.length - 1].mm;
  }

  for (let i = 0; i < table.length - 1; i++) {
    const a = table[i];
    const b = table[i + 1];
    if (carat >= a.carat && carat <= b.carat) {
      const t = (carat - a.carat) / (b.carat - a.carat);
      return a.mm + t * (b.mm - a.mm);
    }
  }

  return 6.4;
}
