import { Routes } from '@angular/router';
import { AntiPatternsComponent } from './anti-patterns';
import { PessimisticComponent } from './pessimistic';
import {OptimisticComponent} from "./optimistic";

import {ProductsApi} from "./product-api";
import {OptimisticStore} from "./optimistic-store";
export const ANTI_PATTERN_ROUTES: Routes = [
  {
    path: '',
    component: AntiPatternsComponent,
    children: [
      {
        path: 'pessimistic',
        component: PessimisticComponent,
      },
      {
        path: 'optimistic',
        providers: [ProductsApi, OptimisticStore],
        component: OptimisticComponent,
      }
    ],
  },
];
