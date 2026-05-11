import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CustomDesignComponent } from './pages/custom-design/custom-design.component';
import { ProductDetailComponent } from './components/product-details/product-details.component';
import { DiamondTryComponent } from './pages/diamond-try/diamond-try.component';
import { AboutComponent } from './pages/about-us/about-us.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'custom-design', component: CustomDesignComponent },
  { path: 'product/:id', component: ProductDetailComponent },
    { path: 'try-diamond', component: DiamondTryComponent },
    { path: 'about', component: AboutComponent }


];