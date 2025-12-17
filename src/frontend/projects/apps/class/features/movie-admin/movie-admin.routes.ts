import { Home } from './movie-admin';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
import { MovieService } from './stores/movie-service';
import { movieAdminStore } from './stores/movie-big';
export const movieAddminRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    providers: [MovieService, movieAdminStore],
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'movie-admin',
        },
        children: [],
      },
    ],
  },
];
