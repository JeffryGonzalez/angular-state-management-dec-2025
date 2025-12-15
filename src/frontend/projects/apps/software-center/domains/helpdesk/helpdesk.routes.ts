import { Home } from './helpdesk';
import { HomePage } from './pages/home';
import { ReportProblemPage } from './pages/report-problem';

import { FeatureRoutes } from '@app-types/routing/feature-routing';
export const helpdeskRoutes: FeatureRoutes = [
  {
    path: '',
    component: Home,
    children: [
      {
        path: '',
        component: HomePage,
        data: {
          title: 'Welcome',
          linkText: 'helpdesk',
        },
        children: [],
      },
      {
        path: 'report-problem',
        component: ReportProblemPage,
        data: {
          title: 'Report a Problem',
          linkText: 'Problem Reporting',
        },
        children: [],
      },
    ],
  },
];
