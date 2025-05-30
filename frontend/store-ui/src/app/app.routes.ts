// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component'; // Import the component

export const routes: Routes = [
  // Route 1: Default Path
  {
    path: '', // Matches the root URL (e.g., http://localhost:4200/)
    redirectTo: 'products', // Redirects to the '/products' path
    pathMatch: 'full' // Ensures the entire path is empty for the redirect
  },

  // Route 2: Products List Path
  {
    path: 'products', // Matches the URL http://localhost:4200/products
    component: ProductListComponent // Loads ProductListComponent when this path is active
  },

  // We will add more routes later, for example:
  // { path: 'products/:id', component: ProductDetailComponent },
  // { path: 'cart', component: CartComponent },
];
