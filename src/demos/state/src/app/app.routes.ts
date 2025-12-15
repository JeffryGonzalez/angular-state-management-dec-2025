import { Routes } from '@angular/router';
import { HomeComponent } from './home';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'ephemeral-user',
    loadChildren: () =>
      import('../ephemeral-user/routes').then((m) => m.EPHEMERAL_USER_ROUTES),
  },
  {
    path: 'anti-patterns',
    loadChildren: () =>
      import('../anti-patterns/routes').then((m) => m.ANTI_PATTERN_ROUTES),
  },

  {
    path: 'outbox',
    loadChildren: () => import('../outbox/routes').then((m) => m.OUTBOX_ROUTES),
  },
  {
    path: 'todo-list',
    loadChildren: () =>
      import('../todo-list/routes').then((m) => m.TODO_LIST_ROUTES),
  },
  {
    path: 'ngrx-events',
    loadChildren: () => import('../events/routes').then((m) => m.EVENTS_ROUTES),
  },
];
