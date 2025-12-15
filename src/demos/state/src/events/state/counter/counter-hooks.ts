import {
  patchState,
  signalStoreFeature,
  type,
  watchState,
  withHooks,
  withProps,
} from '@ngrx/signals';
import { injectDispatch } from '@ngrx/signals/events';
import { CounterState } from './counter-store';

import { counterPageEvents } from './counter-events';

export function withCounterHooks() {
  return signalStoreFeature(
    {
      state: type<CounterState>(),
    },
    withProps(() => {
      const dispatcher = injectDispatch(counterPageEvents);
      return {
        _dispatch: dispatcher,
      };
    }),
    withHooks({
      onInit(store) {
        const savedState = localStorage.getItem('counterState');
        if (savedState) {
          const state = JSON.parse(savedState);
          patchState(store, state);
        }
        watchState(store, (state) => {
          localStorage.setItem('counterState', JSON.stringify(state));
        });
      },
    }),
  );
}
