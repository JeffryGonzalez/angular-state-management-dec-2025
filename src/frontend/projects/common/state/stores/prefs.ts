import {
  patchState,
  signalStore,
  watchState,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withDevtools, withStorageSync } from '@angular-architects/ngrx-toolkit';

import { DOCUMENT, effect, inject } from '@angular/core';

type UserPrefs = {
  sidebarCollapsed: boolean;
  theme: string;
};
export const prefsStore = signalStore(
  withDevtools('prefs-store'),
  withState<UserPrefs>({
    sidebarCollapsed: false,
    theme: 'hypertheory',
  }),

  withMethods((store) => {
    return {
      toggleSideBar: () => patchState(store, { sidebarCollapsed: !store.sidebarCollapsed() }),
      toggleTheme: () =>
        patchState(store, { theme: store.theme() === 'nord' ? 'nord' : 'hypertheory' }),
      _setTheme: (theme: string) => patchState(store, { theme }),
    };
  }),

  withHooks({
    onInit(store) {
      const doc = inject(DOCUMENT);
      const saved = localStorage.getItem('theme');
      if (saved) {
        const parsed = JSON.parse(saved) as unknown as { theme: string };
        store._setTheme(parsed.theme);
      }
      effect(() => {
        const theme = store.theme();
        console.log('Setting theme to', theme);
        doc.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', JSON.stringify({ theme }));
      });

      //doc.documentElement.setAttribute('data-theme', store.theme());
    },
  }),
);
