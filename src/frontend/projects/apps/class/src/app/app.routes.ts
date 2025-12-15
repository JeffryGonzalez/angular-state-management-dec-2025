import { AppRoutes } from '@app-types/routing/app-routing';
import { withDevTimeRoutes } from '@app-types/routing/dev-routes';

const baseRoutes: AppRoutes = [
  {
    path: '',
    loadChildren: () => import('../../domains/home/home.routes').then((m) => m.homeRoutes),
    data: {
      title: 'Home',
      linkText: 'Home',
      pageTitle: 'Home Page',
      iconName: 'solarGlasses',
      linkDescription: 'Start Here',
    },
  },
  {
    path: 'component-state',
    loadChildren: () =>
      import('../../domains/component-state/component-state.routes').then(
        (m) => m.componentStateRoutes,
      ),
    data: {
      title: 'Component State',
      linkText: 'Component State',
      iconName: 'solarCardSearch',
      pageTitle: 'Component State Page',
      linkDescription: 'Inputs, Outputs, and Etc.',
    },
  },
  {
    path: 'browser-state',
    loadChildren: () =>
      import('../../domains/browser-state/browser-state.routes').then((m) => m.browserStateRoutes),
    data: {
      title: 'Browser State',
      linkText: 'Browser State',
      iconName: 'solarCardSearch',
      pageTitle: 'Local Storage, Session Storage, and Etc.',
      linkDescription: 'Somewhat durable',
    },
  },
  {
    path: 'reference-data',
    loadChildren: () =>
      import('../../domains/reference-data/reference-data.routes').then(
        (m) => m.referenceDataRoutes,
      ),
    data: {
      title: 'Reference Data',
      linkText: 'Reference Data',
      iconName: 'solarCardSearch',
      pageTitle: 'Resources',
      linkDescription: 'More durable',
    },
  },
  {
    path: 'mutations',
    loadChildren: () =>
      import('../../domains/mutations/mutations.routes').then((m) => m.mutationsRoutes),
    data: {
      title: 'Mutations',
      linkText: 'Mutations',
      iconName: 'solarCardSearch',
      pageTitle: 'Mutations',
      linkDescription: 'Changing Data',
    },
  },
  {
    path: 'signal-store',
    loadChildren: () =>
      import('../../domains/signal-store/signal-store.routes').then((m) => m.signalStoreRoutes),
    data: {
      title: 'Signal Store',
      linkText: 'Signal Store',
      iconName: 'solarCardSearch',
      pageTitle: 'Signal Store',
      linkDescription: 'Hierarchical Data Store',
    },
  },
  {
    path: 'redux-store',
    loadChildren: () =>
      import('../../domains/redux-store/redux-store.routes').then((m) => m.reduxStoreRoutes),
    data: {
      title: 'Redux Store',
      linkText: 'Redux Store',
      iconName: 'solarCardSearch',
      pageTitle: 'Redux Store',
      linkDescription: 'Event Sourcing and Global Data Store',
    },
  },
  {
    path: 'patterns',
    loadChildren: () =>
      import('../../domains/patterns/patterns.routes').then((m) => m.patternsRoutes),
    data: {
      title: 'Patterns',
      linkText: 'Patterns',
      iconName: 'solarCardSearch',
      pageTitle: 'Patterns',
      linkDescription: 'API Access Patterns',
    },
  },
  {
    path: 'schemata',
    loadChildren: () =>
      import('../../domains/schemata/schemata.routes').then((m) => m.schemataRoutes),
    data: {
      title: 'Schemata',
      linkText: 'Schemata',
      iconName: 'solarCardSearch',
      pageTitle: 'Schemata',
      linkDescription: 'Validations, OpenApi, and Etc.',
    },
  },
  {
    path: 'tools',
    loadChildren: () => import('../../domains/tools/tools.routes').then((m) => m.toolsRoutes),
    data: {
      title: 'Tools',
      linkText: 'Tools',
      iconName: 'solarCardSearch',
      pageTitle: 'Tools',
      linkDescription: 'Various Tools',
    },
  },
];

/**
 * A bit of a hack until we add in authn/authz
 */
export const routes = withDevTimeRoutes(baseRoutes);
