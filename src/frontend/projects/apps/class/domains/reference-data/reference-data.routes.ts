import { Home } from './reference-data';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
import { ResourcePage } from './pages/resource';
export const referenceDataRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'reference-data',
        },
        children: [],
      },
      {
        path: 'resource-api',
        component: ResourcePage,
        data: {
          title: 'Angular Resource Data API',
          linkText: 'Resources in Angular',
        },
        children: [],
      },
    ],
  },
];
