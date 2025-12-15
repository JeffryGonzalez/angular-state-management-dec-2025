import { Home } from './signal-store';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
import { SignalStoreOnePage } from './pages/signal-store-one';
import { FeaturesOfStorePage } from './pages/features';
import { EntitiesPage } from './pages/entities';
import { EventsPage } from './pages/events';
export const signalStoreRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'signal-store',
        },
        children: [],
      },
      {
        path: 'basics',
        component: SignalStoreOnePage,
        data: {
          title: 'Basics',
          linkText: 'Basics',
        },
        children: [],
      },
      {
        path: 'features',
        component: FeaturesOfStorePage,
        data: {
          title: 'Signal Store Features',
          linkText: 'Features',
        },
        children: [],
      },
      {
        path: 'entities',
        component: EntitiesPage,
        data: {
          title: 'Entity Management',
          linkText: 'Entities',
        },
        children: [],
      },
      {
        path: 'events',
        component: EventsPage,
        data: {
          title: 'Events - Redux Like',
          linkText: 'Events',
        },
        children: [],
      },
    ],
  },
];
