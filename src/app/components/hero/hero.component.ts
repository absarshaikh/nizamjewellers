import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';
import { PRODUCT_CATEGORIES } from '../../data/products.data';

declare var bootstrap: any;
@Component({
  selector: 'app-hero',
  standalone: true,
 templateUrl: './hero.component.html',
 styleUrls: ['./hero.component.scss'],
 imports: [CommonModule, RouterLink, ProductCardComponent]
})

export class HeroComponent implements OnInit, AfterViewInit {
  @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  products = PRODUCT_CATEGORIES;

  ngOnInit(): void {
    this.updateView();
    window.addEventListener('resize', () => this.updateView());
    setInterval(() => this.next(), 3000);
  }

  ngAfterViewInit(): void {
    const video = this.videoRef.nativeElement;

    video.muted = true;
    video.volume = 0;

    // Force play again (important for some browsers)
    video.play().catch(() => {
      // autoplay blocked silently
    });

     const el = document.querySelector('#carouselExample');

    if (el) {
      new bootstrap.Carousel(el, {
        interval: 3000,
        ride: 'carousel',
        pause: false,
        wrap: true
      });
    }
  }

  images = [
  'assets/images/image1.jpeg',
  'assets/images/image2.jpeg',
  'assets/images/image3.jpeg',
  'assets/images/image4.jpeg',
  'assets/images/image5.jpeg',
  'assets/images/image1.jpeg',
  'assets/images/image2.jpeg',
  'assets/images/image3.jpeg',
  'assets/images/image4.jpeg',
  'assets/images/image5.jpeg'
];

currentIndex = 0;
itemsPerView = 4;

next() {
  if (this.currentIndex < this.images.length - this.itemsPerView) {
    this.currentIndex++;
  } else {
    this.currentIndex = 0; // loop
  }
}

prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  } else {
    this.currentIndex = this.images.length - this.itemsPerView;
  }
}

updateView() {
  if (window.innerWidth < 640) {
    this.itemsPerView = 1;
  } else if (window.innerWidth < 1024) {
    this.itemsPerView = 2;
  } else {
    this.itemsPerView = 4;
  }

  const maxIndex = Math.max(0, this.images.length - this.itemsPerView);
  if (this.currentIndex > maxIndex) {
    this.currentIndex = maxIndex;
  }
}

//product

}