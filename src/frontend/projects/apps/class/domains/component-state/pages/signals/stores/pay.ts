import { signalStore, withHooks, withState } from '@ngrx/signals';
type PayInfo = {
  hourlyRate: number;
  hoursWorked: number;
};
const initialState: PayInfo = {
  hourlyRate: 0,
  hoursWorked: 0,
};
export const payStore = signalStore(
  withState<PayInfo>(initialState),
  withHooks({
    onInit() {
      console.log('PayInfo Created');
    },
    onDestroy() {
      console.log('Pay info destroyed');
    },
  }),
);

export class PayService {}
