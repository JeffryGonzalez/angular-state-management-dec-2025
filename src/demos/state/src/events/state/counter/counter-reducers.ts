import { signalStoreFeature, type } from '@ngrx/signals';
import { CounterState, initialCounterState } from './counter-store';
import { withReducer, on } from '@ngrx/signals/events';
import { counterPageEvents } from './counter-events';

export function withCounterReducer() {
  return signalStoreFeature(
    {
      state: type<CounterState>(),
    },
    withReducer(
      on(counterPageEvents.increment, () => (state) => ({
        current: state.current + state.by,
      })),
      on(counterPageEvents.decrement, () => ({ current, by }) => ({
        current: current - by >= 0 ? current - by : 0,
      })),
      on(counterPageEvents.reset, () => initialCounterState),
      on(counterPageEvents.setBy, ({ payload: by }) => ({
        by,
      })),
    ),
  );
}
