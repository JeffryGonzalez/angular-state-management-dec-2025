import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'ui-feature-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],

  template: `
    <div class="">
      <div class="f">
        <ng-icon name="solarDocument"></ng-icon>
        {{ pageName() }}
      </div>

      <div class="">
        <ng-content></ng-content>
      </div>
    </div>
  `,

  styles: ``,
})
export class FeaturePage {
  pageName = input.required<string>();
}
