import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
type PayInfo = {
  hourlyRate: number;
  hoursWorked: number;
};
type DemoState = PayInfo & { whenCreated: string | null };
const initialState: DemoState = {
  hourlyRate: 0,
  hoursWorked: 0,
  whenCreated: null,
};

export const payStore = signalStore(
  withDevtools('pay-store'),
  withState<DemoState>(initialState),
  withHooks({
    onInit(store) {
      console.log('PayInfo Created');
      patchState(store, {
        whenCreated: new Date().toISOString(),
        hourlyRate: 52.5,
        hoursWorked: 12,
      });
      // go and get the data from an API or something. This will only get called when the store is created.
    },
    onDestroy() {
      console.log('Pay info destroyed');
      // get rid of that data, I want "fresh data" every time this is injected.
    },
  }),
  withMethods((store) => {
    return {
      add: (hours: number) => patchState(store, { hoursWorked: store.hoursWorked() + hours }),
    };
  }),
  withComputed((store) => {
    return {
      totalPay: computed(() => store.hourlyRate() * store.hoursWorked()),
    };
  }),
);

export class PayService {}
