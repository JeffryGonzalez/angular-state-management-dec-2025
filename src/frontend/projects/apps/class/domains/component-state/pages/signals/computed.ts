import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
type PayInfo = {
  hourlyRate: number;
  hoursWorked: number;
};
@Component({
  selector: 'app-computed-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Computed Signals Component For {{ myName() }}</p>

    <p>Your Name is {{ myName() }}</p>
    <button (click)="embiggenation()" class="btn btn-primary">Click Me!</button>

    <div>
      <p>Your Hourly rate is: {{ hourlyRate() }}</p>
      <p>Number of hours: {{ hoursWorked() }}</p>
      <div>
        <button (click)="add(1)" class="btn btn-primary">Add An Hour</button>
      </div>

      <p>Your Predicted Paycheck is: {{ totalPay() }}</p>
    </div>
  `,
  styles: ``,
})
export class ComputedSignals {
  hoursWorked = signal(40);
  hourlyRate = signal(10.5);

  add(hours: number) {
    this.hourlyRate.update((old) => old + hours);
  }
  // inside of a component, you should always* use signals for any state.
  // inputs should be signals, outputs kind of are, and I'll show that, and any state declared should be as well.
  // what that means is don't do this:
  myName = signal('Jeff');

  embiggenation() {
    // this.myName.set(this.myName().toUpperCase());
    this.myName.update((old) => old.toUpperCase());
  }

  totalPay = computed(() => {
    // create variables for all the signals you are going to use in this first. Not required, but a bit "preemptive"
    const pay = this.hourlyRate();
    const hours = this.hoursWorked();
    return pay * hours;
  });
}
