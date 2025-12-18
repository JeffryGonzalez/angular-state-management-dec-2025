import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideIcons } from '@ng-icons/core';

import { HotkeysService } from '@ngneat/hotkeys';
import { routingStore } from '../../app-shell/application/providers/routing-store';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { prefsStore } from 'projects/common/app/prefs/prefs';
import { navigationIcons } from '@ht/types/routing/icons';

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
