import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withPreferencesStorage } from './preferences/store';

type UserPrefs = {
  sidebarCollapsed: boolean;
};
export const prefsStore = signalStore(
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
