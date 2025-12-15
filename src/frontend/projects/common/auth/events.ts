import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { User } from './internal/types';

export const authEvents = eventGroup({
  source: 'Authentication Events',
  events: {
    loginRequested: type<void>(),
    logoutRequested: type<void>(),
    checkAuth: type<void>(),
  },
});

export const authEffectEvents = eventGroup({
  source: 'Authentication Effect Events',
  events: {
    loginSucceeded: type<User>(),
    loginFailed: type<{ errorMessage: string; error: unknown }>(),
    logoutSucceeded: type<void>(),
  },
});
