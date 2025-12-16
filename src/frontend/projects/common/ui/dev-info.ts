import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { isDevMode } from '@angular/core';
@Component({
  selector: 'ui-dev-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    @defer (when developing()) {
      <div class="flex flex-col p-4 bg-red-700 text-black font-bold font-mono">
        <pre>
    @if(obj() !== undefined) {
        {{ obj() | json}}
    }    
    <ng-content ></ng-content></pre>
      </div>
    }
  `,
  styles: ``,
})
export class DevInfo {
  developing = isDevMode;
  obj = input<unknown | undefined>(undefined);
}
