import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { Routes } from '@angular/router';
import { Authentication } from '@app-auth/authentication';
import { AppRoute } from '@app-types/routing/app-routing';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

export const routingStore = signalStore(
  withDevtools('Routing Store'),
  withProps(() => {
    const auth = inject(Authentication);
    return {
      _auth: auth,
    };
  }),
  withState({
    routes: [] as Routes,
  }),
  withComputed((store) => {
    return {
      routesToUse: computed(() => {
        const result: Set<AppRoute> = new Set();
        store
          .routes()
          .map((route) => route as AppRoute)
          .filter((route) => isDisplayableRoute(route, store._auth))
          .forEach((route) => result.add(route));
        return Array.from(result);
      }),
    };
  }),
  withMethods((store) => {
    return {
      initialize: (routes: Routes) => patchState(store, { routes }),
    };
  }),
);

function isDisplayableRoute(route: AppRoute, auth: Authentication) {
  if (route.data.requiresAuth && auth.isNotLoggedIn) {
    return !route.data.hideIfUnauthenticated;
  } else {
    if (route.data.requiredRoles && route.data.requiredRoles.length > 0) {
      return auth.hasRoles(...route.data.requiredRoles);
    }
  }
  return route.data !== undefined || route.data !== null;
}
