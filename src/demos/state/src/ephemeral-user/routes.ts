import { Routes } from '@angular/router';
import { EphemeralUserComponent } from './ephemeral-user';
import { SortFilterOneComponent } from './sort-filter-one';
import { SortFilterTwoComponent } from './sort-filter-two';
import { SortFilterStore } from './sort-filter-store';
import { SortFilterThreeComponent } from './sort-filter-three';
import { SortFilterStoreTwo } from './sort-filter-store-two';
export const EPHEMERAL_USER_ROUTES: Routes = [
  {
    path: '',
    providers: [SortFilterStore, SortFilterStoreTwo], // [!code highlight]
    component: EphemeralUserComponent,
    children: [
      {
        path: 'sort-filter-one',
        component: SortFilterOneComponent,
      },
      {
        path: 'sort-filter-two',
        component: SortFilterTwoComponent,
      },
      {
        path: 'sort-filter-three',
        component: SortFilterThreeComponent,
      },
    ],
  },
];
