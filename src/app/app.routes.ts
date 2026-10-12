import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomDesignComponent } from './pages/custom-design/custom-design.component';
import { ProductDetailComponent } from './components/product-details/product-details.component';
import { DiamondTryComponent } from './pages/diamond-try/diamond-try.component';
import { AboutComponent } from './pages/about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'custom-design', component: CustomDesignComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'try-diamond', component: DiamondTryComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent },
];