import { AppRoutes } from '@ht/types/routing/app-routing';
import { withDevTimeRoutes } from '@ht/types/routing/dev-routes';

const baseRoutes: AppRoutes = [
  {
    path: '',
    loadChildren: () => import('../../features/home/home.routes').then((m) => m.homeRoutes),
    data: {
      title: 'Home',
      linkText: 'Home',
      pageTitle: 'Home Page',
      iconName: 'solarGlasses',
      linkDescription: 'Start Here',
    },
  },
  {
    path: 'movies',
    loadChildren: () => import('../../features/movies/movies.routes').then((m) => m.moviesRoutes), // Breaks all the code that lives there into a different javascript bundle.
    data: {
      title: 'Movies',
      linkText: 'Movies',
      iconName: 'solarVideoFrameCut',
      pageTitle: 'Movies Page',
      linkDescription: 'List of Movies',
    },
  },
  {
    path: 'movie-admin',
    loadChildren: () =>
      import('../../features/movie-admin/movie-admin.routes').then((m) => m.movieAddminRoutes),
    data: {
      title: 'Movie Admin',
      linkText: 'Movie Admin',
      iconName: 'solarMedalRibbonStar',
      pageTitle: 'Movie Admin Page',
      requiresAuth: true,
      hideIfUnauthenticated: true,
      // requiredRoles: ['MovieAdmins'],
      linkDescription: 'Administration of Movies',
    },
  },
];

/**
 * A bit of a hack until we add in authn/authz
 */
export const routes = withDevTimeRoutes(baseRoutes);
