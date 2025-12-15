import { FeatureRoutes } from '@app-shell/features/feature-routing';
import { Demos } from './demos';
import { HomePage } from './pages/home';
import { FormsPage } from './pages/forms';
import { NotesPage } from './pages/notes';
import { SignalsPage } from './pages/signals';
export const demosRoutes: FeatureRoutes = [
  {
    path: '',
    component: Demos,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'Demos',
          pageTitle: 'Welcome to the demos Page',
          requiresAuth: false,
          iconName: 'solarHome2',
        },
        children: [],
      },

      {
        path: 'notes',
        component: NotesPage,
        data: {
          title: 'Notes',
          linkText: 'Notes',
          pageTitle: 'Notes Demonstrations',
        },
        children: [],
      },
      {
        path: 'signals',
        component: SignalsPage,
        data: {
          title: 'Signals',
          linkText: 'Signals',
          pageTitle: 'Signals Demonstrations',
        },
        children: [],
      },
      {
        path: 'forms',
        component: FormsPage,
        data: {
          title: 'Forms',
          linkText: 'Forms and Stuff',
          pageTitle: 'Forms Demonstrations',
        },
        children: [],
      },
    ],
  },
];
