import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { WorkshopComponent } from '../../components/workshop/workshop.component';
import { CalculatorComponent } from '../../components/calculator/calculator.component';
import { ScrollSectionsComponent } from '../../components/scroll-sections/scroll-sections.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HeroComponent, ScrollSectionsComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}