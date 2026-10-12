import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactFloatComponent } from './components/contact-float/contact-float.component';
import { SiteSchemaService } from './services/site-schema.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ContactFloatComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private siteSchema: SiteSchemaService) {}

  ngOnInit(): void {
    this.siteSchema.injectLocalBusinessSchema();
  }
}