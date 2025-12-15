import { Routes } from '@angular/router';
import { SharedStateComponent } from './shared-state';
import { ProductsStore } from './services/products-store';
import { ProductsApi } from './services/product-api';
export const SHARED_STATE_ROUTES: Routes = [
  {
    path: '',
    providers: [ProductsStore, ProductsApi],
    component: SharedStateComponent,
    children: [],
  },
];
