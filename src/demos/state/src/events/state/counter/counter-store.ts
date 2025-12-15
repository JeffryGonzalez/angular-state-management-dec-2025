import { signalStore, withComputed, withProps, withState } from '@ngrx/signals';
import { withCounterReducer } from './counter-reducers';
import { withCounterHooks } from './counter-hooks';
import { computed } from '@angular/core';
const BY_VALUES = [1, 3, 5] as const;
export type ByValues = (typeof BY_VALUES)[number];
export type CounterState = {
  current: number;
  by: ByValues;
};

export const initialCounterState: CounterState = {
  current: 0,
  by: 1,
};
export const CounterStore = signalStore(
  withState<CounterState>(initialCounterState),
  withCounterReducer(),
  withCounterHooks(),
  withProps(() => ({
    byValues: BY_VALUES,
  })),
  withComputed((store) => ({
    canReset: computed(() => store.current() - store.by() >= 0),
  })),
);
