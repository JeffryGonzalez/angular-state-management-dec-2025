import { isDevMode } from '@angular/core';
import { AppRoutes } from './app-routing';

export function withDevTimeRoutes(routes: AppRoutes): AppRoutes {
  if (isDevMode()) {
    const logInOutRoutes = [
      {
        path: 'bff/login',
        redirectTo: '',
        children: [],
        data: {
          hide: true,
        },
      },
      {
        path: 'bff/logout',
        redirectTo: '',
        children: [],
        data: {
          hide: true,
        },
      },
    ] as unknown as AppRoutes;
    return [...logInOutRoutes, ...routes];
  }
  return routes;
}
