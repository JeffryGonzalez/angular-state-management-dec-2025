import { withPreferencesStorage } from 'projects/common/state/stores/features/store';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

type UserPrefs = {
  sidebarCollapsed: boolean;
};
export const prefsStore = signalStore(
  withDevtools('prefs-store'),
  withState<UserPrefs>({
    sidebarCollapsed: false,
  }),
  withPreferencesStorage('user-prefs'),
  withMethods((store) => {
    return {
      toggleSideBar: () => patchState(store, { sidebarCollapsed: !store.sidebarCollapsed() }),
    };
  }),
);
