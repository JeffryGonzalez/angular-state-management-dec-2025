import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideIcons } from '@ng-icons/core';

import { HotkeysService } from '@ngneat/hotkeys';
import { routingStore } from '../../application/providers/routing-store';
import { navigationIcons } from '../../../types/routing/icons';
import { prefsStore } from '@app-state/stores/preferences/prefs';

export function provideAppShell(): EnvironmentProviders {
  return makeEnvironmentProviders([
    routingStore,
    prefsStore,
    provideIcons(navigationIcons),
    {
      provide: HotkeysService,
      useClass: HotkeysService,
    },
  ]);
}
