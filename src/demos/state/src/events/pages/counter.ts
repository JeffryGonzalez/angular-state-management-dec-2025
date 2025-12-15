import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { counterPageEvents } from '../state/counter/counter-events';
import { CounterStore } from '../state/counter/counter-store';

@Component({
  selector: 'app-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  providers: [CounterStore],
  template: `
    <p>Events</p>
    <div>
      <button (click)="dispatch.decrement()" class="btn btn-circle btn-error">
        -
      </button>
      <span data-testid="current" class="text-2xl">{{
        counterStore.current()
      }}</span>
      <button (click)="dispatch.increment()" class="btn btn-circle btn-success">
        +
      </button>
    </div>
    <div class="join">
      @for (val of counterStore.byValues; track val) {
        <button
          class="btn join-item"
          (click)="dispatch.setBy(val)"
          [class.btn-active]="counterStore.by() === val"
        >
          <span aria-label="current"> {{ val }}</span>
        </button>
      }
    </div>
    <div>
      <button
        class="btn btn-primary"
        (click)="dispatch.reset()"
        [disabled]="!counterStore.canReset()"
      >
        Reset
      </button>
    </div>
  `,
  styles: ``,
})
export class CounterComponent {
  readonly counterStore = inject(CounterStore);
  readonly dispatch = injectDispatch(counterPageEvents);
}
