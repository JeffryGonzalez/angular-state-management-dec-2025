import { Home } from './movies';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
export const moviesRoutes: FeatureRoutes = [
  {
    path: '', // I have no idea what I'm called to the outside world. This is for the app.routes to decide.
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'movies',
        },
        children: [],
      }
    ],
  },
];
