import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'ui-feature-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],

  template: `
    <div
      class="bg-base-200 w-[99%] flex flex-col content-page border-2 border-neutral/50 rounded-none "
    >
      <div
        class="flex flex-row items-center gap-2 text-accent text-xl font-bold h-1/12 p-4 m-0   border-b-2 border-neutral/50 bg-base overflow-scroll"
      >
        <ng-icon name="solarDocument"></ng-icon>
        {{ pageName() }}
      </div>

      <div class="flex-1  p-4  text-base-content h-full ">
        <ng-content></ng-content>
      </div>
    </div>
  `,

  styles: ``,
})
export class FeaturePage {
  pageName = input.required<string>();
}
