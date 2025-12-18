import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideAppAuth } from '@ht/auth/providers';
import { provideAppErrors } from '@ht/errors/providers';

import { provideNgrxStoreForApp } from './internal/ngrx-store-providers';
import { provideAppShell } from './internal/providers';

export function provideHelpDeskProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppShell(),
    provideAppErrors(),
    provideAppAuth(),

    provideNgrxStoreForApp(),
  ]);
}

export function provideClassProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([provideAppShell(), provideNgrxStoreForApp(), provideAppAuth()]);
}
