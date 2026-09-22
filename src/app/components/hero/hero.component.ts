import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../product-card/product-card.component';

declare var bootstrap: any;
@Component({
  selector: 'app-hero',
  standalone: true,
 templateUrl: './hero.component.html',
 styleUrls: ['./hero.component.scss'],
 imports: [CommonModule, RouterLink, ProductCardComponent]
})

export class HeroComponent {

   @ViewChild('videoRef') videoRef!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
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
slideWidth = 25; // 4 images = 25% each

itemsPerView = 4;

//  slideWidth() {
//   return 100 / this.itemsPerView;
// }


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





ngOnInit() {
  this.updateView();

  window.addEventListener('resize', () => this.updateView());

  setInterval(() => this.next(), 3000);
}

updateView() {
  if (window.innerWidth < 640) {
    this.slideWidth = 100; // 1 image
  } else if (window.innerWidth < 1024) {
    this.slideWidth = 50; // 2 images
  } else {
    this.slideWidth = 25; // 4 images
  }
}

//product

products = [
  {
    id: 'ring',
    name: 'Elegant Ring',
    desc: 'Diamond-studded premium ring',
    image: 'assets/images/product/ring.jpg'
  },
  {
    id: 'bracelet',
    name: 'Luxury Bracelet',
    desc: 'Modern gold bracelet design',
    image: 'assets/images/product/bracelet.jpg'
  },
  {
    id: 'locket', 
    name: 'Classic Locket',
    desc: 'Timeless gold locket piece',
    image: 'assets/images/product/locket.jpg'
  },
  {
    id: 'bangle', 
    name: 'Designer Bangle',
    desc: 'Traditional meets modern style',
    image: 'assets/images/product/bangle.jpg'
  },
  {
    id: 'chain',
    name: 'Gold Chain',
    desc: 'Minimal and elegant chain',
    image: 'assets/images/product/chain.jpg'
  }
];
}