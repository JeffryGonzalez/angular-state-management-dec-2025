import { FeatureRoutes } from '@app-types/routing/feature-routing';
import { Home } from './home';
import { HomePage } from './pages/home';
import { ClassesPage } from './pages/classes';
import { ThisClassPage } from './pages/this-class';
import { TimerPage } from './pages/timer';
import { IntroPage } from './pages/intro';

export const homeRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'home',
        },
        children: [],
      },
      {
        path: 'classes',
        component: ClassesPage,
        data: {
          title: 'Classes',
          linkText: 'Classes',
        },
        children: [],
      },
      {
        path: 'thisclass',
        component: ThisClassPage,
        data: {
          title: 'This Class',
          linkText: 'This Class',
        },
        children: [],
      },
      {
        path: 'timer',
        component: TimerPage,
        data: {
          title: 'Timer',
          linkText: 'Timer',
        },
        children: [],
      },
      {
        path: 'intro',
        component: IntroPage,
        data: {
          title: 'Intros',
          linkText: 'Intros',
        },
        children: [],
      },
    ],
  },
];
