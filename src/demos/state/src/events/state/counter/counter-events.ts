import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { ByValues } from './counter-store';
export const counterPageEvents = eventGroup({
  source: 'Counter Page',
  events: {
    increment: type<void>(),
    decrement: type<void>(),
    reset: type<void>(),
    setBy: type<ByValues>(),
  },
});
