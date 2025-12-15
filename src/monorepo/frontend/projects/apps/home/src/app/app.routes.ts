import {
  authenticatedAsSoftwareEmployeeGuard,
  authenticatedGuard,
} from '@app-auth/authenticated-guard';
import { AppRoutes } from '@app-shell/application/app-routing';
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
    path: 'vendors',
    canActivate: [authenticatedAsSoftwareEmployeeGuard],
    loadChildren: () => import('../../domains/vendors/vendors.routes').then((m) => m.vendorsRoutes),
    data: {
      pageTitle: 'Vendors',
      linkText: 'Vendors',

      iconName: 'solarBlackHole',
      requiresAuth: true,
      requiredRoles: ['SoftwareCenter', 'Manager'],
      hideIfUnauthenticated: true,
      linkDescription: 'Vendors and Stuff',
    },
  },
  {
    path: 'catalog',
    canActivate: [authenticatedAsSoftwareEmployeeGuard],
    loadChildren: () => import('../../domains/catalog/catalog.routes').then((m) => m.catalogRoutes),
    data: {
      pageTitle: 'Catalog',
      linkText: 'Catalog',
      iconName: 'solarBox',
      requiresAuth: true,
      requiredRoles: ['SoftwareCenter'],
      hideIfUnauthenticated: true,
      linkDescription: 'Software Catalog',
    },
  },
  {
    path: 'identity',
    canActivate: [authenticatedGuard],
    loadChildren: () =>
      import('../../domains/identity/identity.routes').then((m) => m.identityRoutes),
    data: {
      pageTitle: 'Identity Thing',
      linkText: 'Identity',
      iconName: 'solarUser',
      requiresAuth: true,
      linkDescription: 'Identity Management',
    },
  },
  {
    path: 'demos',
    loadChildren: () => import('../../domains/demos/demos.routes').then((m) => m.demosRoutes),
    data: {
      pageTitle: 'Demos',
      linkText: 'Demos',
      iconName: 'solarGlasses',
      requiresAuth: false,
      linkDescription: 'Demos and Stuff',
    },
  },
];
