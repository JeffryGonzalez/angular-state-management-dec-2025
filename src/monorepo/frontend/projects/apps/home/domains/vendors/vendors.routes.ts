import { Vendors } from './vendors';
import { HomePage } from './pages/home';
import { AddPage } from './pages/add';
import { FeatureRoutes } from '@app-shell/features/feature-routing';
export const vendorsRoutes: FeatureRoutes = [
  {
    path: '',
    component: Vendors,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'vendors',
        },
        children: [],
      },
      {
        path: 'add',
        component: AddPage,
        data: {
          title: 'Add Vendor',
          linkText: 'Add Vendor',
        },
        children: [],
      },
    ],
  },
];
