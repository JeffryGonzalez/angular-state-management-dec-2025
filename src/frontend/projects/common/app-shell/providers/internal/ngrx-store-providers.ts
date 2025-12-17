import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { notificationFeature } from '@app-shell/application/notifications-feature';
import { routerReducer, provideRouterStore, RouterState } from '@ngrx/router-store';
import { provideState, provideStore } from '@ngrx/store';

export function provideNgrxStoreForApp(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore({
      routerState: RouterState.Minimal,
    }),
    provideState(notificationFeature),
  ]);
}
