import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideAppAuth } from '@app-auth/providers';
import { provideAppErrors } from '@app-errors/providers';

import { provideAppShell } from 'projects/common/app-shell/providers/internal/providers';
import { provideNgrxStoreForApp } from './internal/ngrx-store-providers';

export function provideAppProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideAppShell(),
    provideAppErrors(),
    provideAppAuth(),

    provideNgrxStoreForApp(),
  ]);
}
