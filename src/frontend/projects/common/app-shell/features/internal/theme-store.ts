import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { DOCUMENT, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

const themeList = ['frappe', 'latte', 'macchiato', 'mocha'] as const;

type Theme = (typeof themeList)[number];
type ThemeState = { theme: Theme | null };
export const themeStore = signalStore(
  withStorageSync('theme'),
  withState<ThemeState>({ theme: 'macchiato' }),
  withProps(() => {
    return {
      themes: themeList,
    };
  }),
  withMethods((store) => {
    return {
      set: (theme: Theme) => {
        patchState(store, { theme });
      },
    };
  }),
  withHooks({
    onInit: (store) => {
      const theDocument = inject(DOCUMENT);
      watchState(store, (state) => {
        if (state.theme) {
          theDocument.documentElement.dataset['theme'] = state.theme;
        }
      });
    },
  }),
);
