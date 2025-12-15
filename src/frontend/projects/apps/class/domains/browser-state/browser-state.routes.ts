import { Home } from './browser-state';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
export const browserStateRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'browser-state',
        },
        children: [],
      },
    ],
  },
];
