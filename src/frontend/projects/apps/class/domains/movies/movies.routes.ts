import { Home } from './movies';
import { DetailsPage } from './pages/details';
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
      },
      {
        path: ':id',
        component: DetailsPage,
        data: {
          title: 'Movie Details',
          linkText: 'details',
        },
        children: [],
      },
    ],
  },
];
