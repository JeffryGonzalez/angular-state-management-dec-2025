import { Home } from './patterns';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
import { OptimisticPage } from './pages/optimistic';
import { PessimisticPage } from './pages/pessimistic';
import { OutboxPage } from './pages/outbox';
export const patternsRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'patterns',
        },
        children: [],
      },
      {
        path: 'optimistic',
        component: OptimisticPage,
        data: {
          title: 'Optimistic',
          linkText: 'Optimistic',
        },
        children: [],
      },
      {
        path: 'pessimistic',
        component: PessimisticPage,
        data: {
          title: 'Pessimistic',
          linkText: 'Pessimistic',
        },
        children: [],
      },
      {
        path: 'outbox',
        component: OutboxPage,
        data: {
          title: 'Using an Outbox',
          linkText: 'Using an Outbox',
        },
        children: [],
      },
    ],
  },
];
