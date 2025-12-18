import { Home } from './movies';

import { HomePage } from './pages/home';

import { FeatureRoutes } from '@ht/types/routing/feature-routing';

import { ListWithHttpClientPage } from './pages/lists/list-with-http-client';
import { DetailsPage } from './pages/lists/details';
import { ListsPage } from './pages/lists/home';
import { movieStore } from './stores/movie';
import { ListHttpResourcePage } from './pages/lists/list-http-resource';
import { RatingsListener } from './stores/ratings-service';
import { ratingsStore } from './stores/ratings';
export const moviesRoutes: FeatureRoutes = [
  {
    path: '', // I have no idea what I'm called to the outside world. This is for the app.routes to decide.
    component: Home,
    providers: [movieStore, RatingsListener, ratingsStore], // if you provide on a route, it is available to any "child" of this route.
    // it is created "lazily" - when it is first used, but never taken ot of memory. It stays there. You MIGHT want that.
    children: [
      {
        path: '',
        providers: [],
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'movies',
        },
        children: [],
      },
      {
        path: 'list',
        component: ListsPage,
        providers: [],
        data: {
          title: 'Movie Lists',
          linkText: 'Movie Lists',
        },
        children: [
          {
            path: '',
            component: ListHttpResourcePage,
            data: {
              title: 'Movie Lists with HttpResource',
              linkText: 'List with HttpResource',
            },
            children: [],
          },
          {
            path: 'with-http-client',
            component: ListWithHttpClientPage,
            data: {
              title: 'Movie Lists with HttpClient',
              linkText: 'List with HttpClient',
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
    ],
  },
];
