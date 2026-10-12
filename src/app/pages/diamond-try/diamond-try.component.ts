import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  caratToDiameterMm,
  HAND_COMPARE_CARATS,
  MIN_CARAT,
  ROUND_DIAMOND_SIZES,
} from './diamond-round.data';

/** Short edge (horizontal on screen when card is held vertical) */
const CARD_WIDTH_MM = 53.98;
const CARD_LENGTH_MM = 85.6;
const CALIBRATION_STORAGE_KEY = 'nizam-diamond-calibration-v2';
const HAND_SPAN_MM = 82;
const RING_TOP_PERCENT = 26;
const RING_LEFT_PERCENT = 66;

type Step = 'calibrate' | 'try-on';

interface SavedCalibration {
  pxPerMm: number;
  scale: number;
}

@Component({
  selector: 'app-diamond-try',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './diamond-try.component.html',
  styleUrls: ['./diamond-try.component.scss'],
})
export class DiamondTryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('handImage') handImageRef?: ElementRef<HTMLImageElement>;
  @ViewChild('cardOutline') cardOutlineRef?: ElementRef<HTMLElement>;

  readonly sizeChartRows = ROUND_DIAMOND_SIZES.map((s) => ({
    mm: s.mm,
    carat: s.carat,
  }));
  readonly compareCarats = HAND_COMPARE_CARATS;
  readonly minCarat = MIN_CARAT;

  step: Step = 'calibrate';

  size = 1;
  mm = 6.4;
  diamondWidthPx = 0;
  diamondHeightPx = 0;

  shape = 'round';
  shapes = ['round', 'square', 'oval'];

  diamondSrc = 'assets/images/diamond-round.png';

  pxPerMm = 0;

  cardScale = 1;
  cardScaleMin = 0.45;
  cardScaleMax = 2.75;

  measuredCardPx = 0;
  handDisplayWidthPx = 0;

  readonly ringTopPercent = RING_TOP_PERCENT;
  readonly ringLeftPercent = RING_LEFT_PERCENT;

  get cardWidthMm(): number {
    return CARD_WIDTH_MM * this.cardScale;
  }

  get cardHeightMm(): number {
    return CARD_LENGTH_MM * this.cardScale;
  }

  private resizeObserver?: ResizeObserver;
  private onWindowResize = () => {
    if (this.step === 'calibrate') {
      this.measureCardOutline();
    } else {
      this.applyDiamondPixels();
    }
  };

  ngOnInit(): void {
    const saved = this.loadCalibration();
    if (saved) {
      this.pxPerMm = saved.pxPerMm;
      this.cardScale = saved.scale;
      this.syncHandScale();
      this.step = 'try-on';
      this.updateSize();
      return;
    }

    this.cardScale = 1;
    this.scheduleMeasureCard();
  }

  ngAfterViewInit(): void {
    const hand = this.handImageRef?.nativeElement;
    if (hand) {
      this.resizeObserver = new ResizeObserver(() => this.applyDiamondPixels());
      this.resizeObserver.observe(hand);
    }

    window.addEventListener('resize', this.onWindowResize);
    this.scheduleMeasureCard();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    window.removeEventListener('resize', this.onWindowResize);
  }

  isCalibrated(): boolean {
    return this.pxPerMm > 0;
  }

  diameterPxForCarat(carat: number): number {
    if (this.pxPerMm <= 0) {
      return 0;
    }
    return caratToDiameterMm(carat) * this.pxPerMm;
  }

  mmForCarat(carat: number): number {
    return caratToDiameterMm(carat);
  }

  isSelectedCarat(carat: number): boolean {
    return Math.abs(this.size - carat) < 0.06;
  }

  isSelectedChartRow(row: { mm: number; carat: number }): boolean {
    return Math.abs(this.size - row.carat) < 0.06;
  }

  pickCarat(carat: number): void {
    this.size = carat;
    this.updateSize();
  }

  onCardScaleChange(): void {
    this.scheduleMeasureCard();
  }

  confirmCalibration(): void {
    this.measureCardOutline();
    if (this.pxPerMm <= 0) {
      return;
    }

    localStorage.setItem(
      CALIBRATION_STORAGE_KEY,
      JSON.stringify({ pxPerMm: this.pxPerMm, scale: this.cardScale }),
    );
    this.step = 'try-on';
    this.syncHandScale();
    this.updateSize();
    setTimeout(() => this.applyDiamondPixels(), 0);
  }

  openCalibration(): void {
    this.step = 'calibrate';
    setTimeout(() => this.scheduleMeasureCard(), 50);
  }

  updateSize(): void {
    this.mm = caratToDiameterMm(this.size);
    this.applyDiamondPixels();
  }

  setShape(s: string): void {
    this.shape = s;
    this.diamondSrc = `assets/images/diamond-${s}.png`;
    this.applyDiamondPixels();
  }

  private scheduleMeasureCard(): void {
    requestAnimationFrame(() => this.measureCardOutline());
  }

  onHandImageLoad(): void {
    this.syncHandScale();
    if (this.step === 'calibrate') {
      this.scheduleMeasureCard();
    } else {
      this.applyDiamondPixels();
    }
  }

  private measureCardOutline(): void {
    const el = this.cardOutlineRef?.nativeElement;
    if (!el) {
      return;
    }

    const width = el.getBoundingClientRect().width;
    if (width <= 0) {
      return;
    }

    this.measuredCardPx = width;
    const trueWidthMm = CARD_WIDTH_MM * this.cardScale;
    this.pxPerMm = width / trueWidthMm;
    this.syncHandScale();
    this.applyDiamondPixels();
  }

  private syncHandScale(): void {
    if (this.pxPerMm <= 0) {
      return;
    }
    this.handDisplayWidthPx = HAND_SPAN_MM * this.pxPerMm;
  }

  private loadCalibration(): SavedCalibration | null {
    try {
      const raw =
        localStorage.getItem(CALIBRATION_STORAGE_KEY) ??
        localStorage.getItem('nizam-diamond-calibration-v3');
      if (!raw) {
        return null;
      }
      const data = JSON.parse(raw) as SavedCalibration;
      if (
        !data ||
        !Number.isFinite(data.pxPerMm) ||
        data.pxPerMm <= 0 ||
        !Number.isFinite(data.scale)
      ) {
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  private applyDiamondPixels(): void {
    if (this.pxPerMm <= 0) {
      return;
    }

    const diameterPx = this.mm * this.pxPerMm;

    if (this.shape === 'oval') {
      this.diamondWidthPx = diameterPx * 0.72;
      this.diamondHeightPx = diameterPx * 1.28;
      return;
    }

    if (this.shape === 'square') {
      this.diamondWidthPx = diameterPx;
      this.diamondHeightPx = diameterPx;
      return;
    }

    this.diamondWidthPx = diameterPx;
    this.diamondHeightPx = diameterPx;
  }
}
