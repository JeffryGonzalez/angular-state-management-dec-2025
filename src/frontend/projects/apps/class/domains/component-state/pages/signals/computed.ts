import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { payStore } from './stores/pay';
import { CurrencyPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-computed-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, JsonPipe],

  viewProviders: [],
  template: `
    <div>
      <p>Your Hourly rate is: {{ store.hourlyRate() }}</p>
      <p>Number of hours: {{ store.hoursWorked() }}</p>
      <div>
        <button (click)="store.add(1)" class="btn btn-primary">Add An Hour</button>
      </div>

      <p>Your Predicted Paycheck is: {{ store.totalPay() | currency }}</p>
    </div>

    <pre
      >{{ store.hourlyRate() }}
  </pre
    >
  `,
  styles: ``,
})
export class ComputedSignals {
  protected store = inject(payStore);
}
