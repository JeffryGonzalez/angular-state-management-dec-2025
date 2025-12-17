import { ChangeDetectionStrategy, Component, model, signal } from '@angular/core';

import { FormValueControl } from '@angular/forms/signals';
import { MovieRatings } from '../../../types';
import { StarIcon } from './star-icon';

@Component({
  selector: 'app-movie-rating-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StarIcon],
  template: `
    @for (r of range(); track r) {
      <button
        type="button"
        class="btn btn-ghost rounded-none p-0 m-0"
        [class.bg-yellow-200]="r <= value()"
        (click)="setValue(r)"
      >
        <app-star-icon />
      </button>
    }

    <span>{{ value() }} out of 5 stars</span>
  `,
  styles: ``,
})
export class RatingInput implements FormValueControl<MovieRatings> {
  protected range = signal([1, 2, 3, 4, 5]);
  value = model(1 as MovieRatings);

  setValue(val: number): void {
    this.value.set(val as MovieRatings);
  }
  // value: ModelSignal<1 | 2 | 3 | 4 | 5>;
  // checked?: undefined;
  // errors?: InputSignal<readonly WithOptionalField<ValidationError>[]> | InputSignalWithTransform<readonly WithOptionalField<ValidationError>[], unknown> | undefined;
  // disabled?: InputSignal<boolean> | InputSignalWithTransform<boolean, unknown> | undefined;
  // disabledReasons?: InputSignal<readonly WithOptionalField<DisabledReason>[]> | InputSignalWithTransform<readonly WithOptionalField<DisabledReason>[], unknown> | undefined;
  // readonly?: InputSignal<boolean> | InputSignalWithTransform<boolean, unknown> | undefined;
  // hidden?: InputSignal<boolean> | InputSignalWithTransform<boolean, unknown> | undefined;
  // invalid?: InputSignal<boolean> | InputSignalWithTransform<boolean, unknown> | undefined;
  // pending?: InputSignal<boolean> | InputSignalWithTransform<boolean, unknown> | undefined;
  // touched?: InputSignal<boolean> | InputSignalWithTransform<boolean, unknown> | ModelSignal<boolean> | OutputRef<boolean> | undefined;
  // dirty?: InputSignal<boolean> | InputSignalWithTransform<boolean, unknown> | undefined;
  // name?: InputSignal<string> | InputSignalWithTransform<string, unknown> | undefined;
  // required?: InputSignal<boolean> | InputSignalWithTransform<boolean, unknown> | undefined;
  // min?: InputSignal<number | undefined> | InputSignalWithTransform<number | undefined, unknown> | undefined;
  // minLength?: InputSignal<number | undefined> | InputSignalWithTransform<number | undefined, unknown> | undefined;
  // max?: InputSignal<number | undefined> | InputSignalWithTransform<number | undefined, unknown> | undefined;
  // maxLength?: InputSignal<number | undefined> | InputSignalWithTransform<number | undefined, unknown> | undefined;
  // pattern?: InputSignal<readonly RegExp[]> | InputSignalWithTransform<readonly RegExp[], unknown> | undefined;
}
