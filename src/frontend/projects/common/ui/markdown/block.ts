import { Component, computed, input } from '@angular/core';
import { MarkdownComponent, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'ui-markdown-block',
  imports: [MarkdownComponent],
  template: `<div>
    <markdown class="prose prose-xl" lineNumbers clipboard [src]="src()" />
  </div> `,
  viewProviders: [provideMarkdown({})],
  styles: ``,
})
export class MarkdownBlockComponent {
  source = input.required<string>();

  src = computed(() => `/assets/${this.source()}`);
}
