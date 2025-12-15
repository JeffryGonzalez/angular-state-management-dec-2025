import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { UserProfile } from './profile';

export const profileEvents = eventGroup({
  source: '[App] Profile Events',
  events: {
    profileLoaded: type<UserProfile>(),
    profileLoadFailed: type<{ error: string }>(),
  },
});

export const profileCommands = eventGroup({
  source: '[App] Profile Commands',
  events: {
    loadProfile: type<{ id: string }>(),
  },
});
