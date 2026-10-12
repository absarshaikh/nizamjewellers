import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-scroll-sections',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './scroll-sections.component.html',
  styleUrls: ['./scroll-sections.component.scss'],
})
export class ScrollSectionsComponent implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const blocks = this.el.nativeElement.querySelectorAll('.story-block');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    blocks.forEach((block) => this.observer?.observe(block));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
