import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
export const appErrorEvents = eventGroup({
  source: 'Application Errors',
  events: {
    setError: type<{ error: string; feature: string; originalError?: unknown }>(),
    clearError: type<string>(),
  },
});
