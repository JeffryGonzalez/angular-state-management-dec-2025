import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

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
  ]);
}
