import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-diamond-try',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './diamond-try.component.html',
  styleUrls: ['./diamond-try.component.scss']
})
export class DiamondTryComponent {
size = 1;
mm = 6.4;
diamondPx = 26;

shape = 'round';
shapes = ['round', 'square', 'oval'];

diamondSrc = 'assets/images/diamond-round.png';

/* PRECISE MAP */
private sizeMap: Record<number, number> = {
  0.2: 3.8,
  0.3: 4.4,
  0.5: 5.1,
  1: 6.4,
  1.5: 7.3,
  2: 8.1,
  3: 9.4,
  4: 10.4,
  5: 11.0
};

/* CALIBRATION */
pxPerMM = 4;

/* UPDATE ON SLIDER */
updateSize() {
  this.mm = this.getMM(this.size);
  this.diamondPx = this.getPx(this.mm);
}

/* MM CALC */
private getMM(carat: number): number {
  if (this.sizeMap[carat]) return this.sizeMap[carat];
  return 6.4 + (carat - 1) * 1.5;
}

/* PX CALC */
private getPx(mm: number): number {
  let base = mm * this.pxPerMM;

  if (this.shape === 'oval') return base * 1.2;
  if (this.shape === 'square') return base * 0.95;

  return base;
}

/* SHAPE SWITCH */
setShape(s: string) {
  this.shape = s;
  this.diamondSrc = `assets/images/diamond-${s}.png`;
    // this.diamondSrc = `assets/images/diamond.png`;
  this.updateSize();
}

/* INIT */
ngOnInit() {
  this.updateSize();
}
}