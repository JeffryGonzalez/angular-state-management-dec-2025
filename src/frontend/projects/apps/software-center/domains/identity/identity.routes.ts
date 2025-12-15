import { authenticatedGuard } from '@app-auth/authenticated-guard';

import { Home } from './identity';
import { User } from './pages/user';

import { ProfilePage } from './pages/profile';
import { FeatureRoutes } from '@app-types/routing/feature-routing';
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
      {
        path: 'profile',
        component: ProfilePage,
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
