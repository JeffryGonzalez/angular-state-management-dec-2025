import { FeatureRoutes } from '@app-shell/features/feature-routing';
import { Home } from './home';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/home';
export const homeRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        pathMatch: 'full',
        data: {
          title: 'Welcome',
          linkText: 'Home',
          pageTitle: 'Welcome to the Home Page',
          requiresAuth: false,
          iconName: 'solarHome2',
        },
        children: [],
      },
      {
        path: 'about',
        component: AboutPage,
        data: {
          title: 'About',
          linkText: 'About',
          pageTitle: 'About',
          requiresAuth: false,
          iconName: 'solarDocument',
        },
        children: [],
      },
    ],
  },
];
