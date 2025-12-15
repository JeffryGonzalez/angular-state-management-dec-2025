import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';
import { computed, effect, inject } from '@angular/core';
import { Authentication } from '@app-auth/authentication';
import { mapResponse } from '@ngrx/operators';
import { signalStore, withComputed, withHooks, withProps, withState } from '@ngrx/signals';
import { Events, injectDispatch, on, withEffects, withReducer } from '@ngrx/signals/events';
import { exhaustMap } from 'rxjs';
import { profileCommands, profileEvents } from './events';

export type ContactInformation = {
  email: string | null;
  phone: string | null;
  preferredContactMethod: 'email' | 'phone';
};
export type PersonalInformation = {
  firstName: string;
  lastName: string;
  mi: string;
};
export type UserProfile = {
  id: string | null;
  info: PersonalInformation | null;
  contactInfo: ContactInformation | null;
};

type ProfileState = {
  _profile: UserProfile | null;
};
export const profileStore = signalStore(
  withDevtools('user-profile'),
  withProps(() => {
    const auth = inject(Authentication);

    return {
      _user: auth.user,
    };
  }),
  withState<ProfileState>({
    _profile: null,
  }),
  withHooks({
    onInit(store) {
      const dispatch = injectDispatch(profileCommands);
      effect(() => {
        const user = store._user();
        if (user?.isAuthenticated) {
          const id = user.id;
          if (id !== null) {
            dispatch.loadProfile({ id });
          }
        }
      });
    },
  }),
  withReducer(
    on(profileEvents.profileLoaded, (event) => ({ _profile: event.payload })),
    on(profileEvents.profileLoadFailed, (event) => {
      console.log(event.payload.error);
      return {};
    }),
  ),
  withComputed((store) => {
    return {
      hasProfile: computed(() => store._profile() !== null),
      profile: computed(() => store._profile()),
    };
  }),
  withEffects((store, events = inject(Events), http = inject(HttpClient)) => ({
    loadProfile$: events.on(profileCommands.loadProfile).pipe(
      exhaustMap((action) =>
        http.get<UserProfile>(`/api/users/${action.payload.id}/profile`).pipe(
          mapResponse({
            next: (response) => profileEvents.profileLoaded(response),
            error: (error) =>
              profileEvents.profileLoadFailed({ error: 'Loading Profile Failed' + error }),
          }),
        ),
      ),
    ),
  })),
);
