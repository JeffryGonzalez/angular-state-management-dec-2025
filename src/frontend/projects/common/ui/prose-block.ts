import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-prose-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="prose prose-lg prose-headings:text-accent prose-strong:text-accent ">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class ProseBlock {}
