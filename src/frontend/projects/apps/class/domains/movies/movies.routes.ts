import { Home } from './movies';
import { DetailsPage } from './pages/details';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
import { MovieListTwoPage } from './pages/movie-list-two';
import { bigMovieStore } from './stores/movie-big';
import { MovieService } from './stores/movie-service';
export const moviesRoutes: FeatureRoutes = [
  {
    path: '', // I have no idea what I'm called to the outside world. This is for the app.routes to decide.
    component: Home,
    providers: [bigMovieStore, MovieService], // if you provide on a route, it is available to any "child" of this route.
    // it is created "lazily" - when it is first used, but never taken out of memory. It stays there. You MIGHT want that.
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
        path: 'big-movies',
        component: MovieListTwoPage,
        data: {
          linkText: 'Big List of Movies',
          title: 'Big Movie',
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
