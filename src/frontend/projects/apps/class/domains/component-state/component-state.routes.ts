import { Home } from './component-state';
import { HomePage } from './pages/home';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
import { SignalsHomePage } from './pages/signals/home';
import { Basic } from './pages/signals/basic';
import { ComputedSignals } from './pages/signals/computed';
import { linkedSignal } from '@angular/core';
import { Linked } from './pages/signals/linked';

export const componentStateRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'State In Components',
          linkText: 'component-state',
        },
        children: [],
      },
      {
        path: 'signals',
        component: SignalsHomePage,
        data: {
          title: 'Signals',
          linkText: 'Signals',
        },
        children: [
          {
            path: '',
            component: Basic,
            data: {
              title: 'Basic',
              linkText: 'Signals',
            },
            children: [],
          },
          {
            path: 'computed',
            component: ComputedSignals,
            data: {
              title: 'Computed',
              linkText: 'component-state/signals/computed',
            },
            children: [],
          },
          {
            path: 'linked',
            component: Linked,
            data: {
              title: 'Linked',
              linkText: 'Linked Signals',
            },
            children: [],
          },
        ],
      },
    ],
  },
];
