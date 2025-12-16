import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, isDevMode } from '@angular/core';

@Component({
  selector: 'app-dev-notice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    @defer (when developing) {
      <div
        class="absolute bottom-0 w-1/2 bg-orange-500 font-mono text-lg text-green-200 p-2 border-8 border-dotted border-black  overflow-scroll max-h-1/2"
      >
        <div tabindex="0" class="collapse bg-base-100 border-base-300 border">
          <div class="collapse-title font-semibold">See Developer Output</div>
          <div class="collapse-content  bg-green-900 text-lg text-black font-semibold">
            <ng-content></ng-content>
            <pre>
@if (content()) {
{{ content() | json }}
}
</pre>
          </div>
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class DevNotice {
  developing = isDevMode();
  content = input<unknown | undefined>(undefined);
}
