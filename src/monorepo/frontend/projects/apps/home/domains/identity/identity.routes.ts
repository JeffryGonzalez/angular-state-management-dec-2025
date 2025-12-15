import { authenticatedGuard } from '@app-auth/authenticated-guard';

import { Home } from './identity';
import { User } from './pages/user';
import { FeatureRoutes } from '@app-shell/features/feature-routing';
export const identityRoutes: FeatureRoutes = [
  {
    path: '',
    canActivate: [authenticatedGuard],
    component: Home,
    children: [
      {
        path: '',
        component: User,
        data: {
          title: 'User Profile',
          linkText: 'Profile',
          pageTitle: 'Identity - User Profile',
        },
        children: [],
      },
    ],
  },
];
