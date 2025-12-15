import { Home } from './redux-store';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
export const reduxStoreRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'redux-store',
        },
        children: [],
      },
    ],
  },
];
