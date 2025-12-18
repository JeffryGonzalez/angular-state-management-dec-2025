import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideIcons } from '@ng-icons/core';

import { HotkeysService } from '@ngneat/hotkeys';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { prefsStore } from '@ht/state/stores/prefs';
import { navigationIcons } from '@ht/types/routing/icons';
import { routingStore } from '../../application/providers/routing-store';

export function provideAppShell(): EnvironmentProviders {
  return makeEnvironmentProviders([
    routingStore,
    prefsStore,
    provideStoreDevtools(),
    provideIcons(navigationIcons),
    {
      provide: HotkeysService,
      useClass: HotkeysService,
    },
  ]);
}
