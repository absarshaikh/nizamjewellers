import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-scroll-sections',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-sections.component.html'
})
export class ScrollSectionsComponent implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const sections = this.el.nativeElement.querySelectorAll('.fade-section');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    sections.forEach((section: any) => observer.observe(section));
  }

  
}