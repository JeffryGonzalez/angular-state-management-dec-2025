import { Home } from './catalog';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-shell/features/feature-routing';
export const catalogRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'catalog',
        },
        children: [],
      },
    ],
  },
];
