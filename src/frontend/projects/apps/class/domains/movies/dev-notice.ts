import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-dev-notice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class=" bg-green-400 text-black p-4 border-8 border-dashed border-orange-400">
      <p>{{ message() }}</p>
    </div>
  `,
  styles: ``,
})
export class DevNotice {
  message = input.required<string>();
}
