import { AppRoutes } from '@app-types/routing/app-routing';
export const routes: AppRoutes = [
  {
    path: '',
    loadChildren: () => import('../../domains/home/home.routes').then((m) => m.homeRoutes),
    data: {
      pageTitle: 'Welcome',
      linkText: 'Home',
      iconName: 'solarHome2',
      title: 'Home',
      linkDescription: 'Welcome Aboard',
    },
  },
  {
    path: 'help-desk',
    loadChildren: () =>
      import('../../domains/helpdesk/helpdesk.routes').then((m) => m.helpdeskRoutes),
    data: {
      pageTitle: 'Help Desk',
      linkText: 'Help Desk',
      iconName: 'solarHelp',
      requiresAuth: true,
      hideIfUnauthenticated: true,
      title: 'Help Desk',
      linkDescription: 'Get Help',
    },
  },
  {
    path: 'identity',
    loadChildren: () =>
      import('../../domains/identity/identity.routes').then((m) => m.identityRoutes),
    data: {
      pageTitle: 'Identity',
      linkText: 'Identity',
      iconName: 'solarUser',
      requiresAuth: true,
      title: 'Identity',
      linkDescription: 'Manage Your Identity',
    },
  },
];
