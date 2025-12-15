import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { MarkdownBlockComponent } from '@app-ui/markdown/block';
import { MarkdownComponent } from 'ngx-markdown';
import { payStore } from './signals/stores/pay';

@Component({
  selector: 'app-component-state-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MarkdownBlockComponent, MarkdownComponent],
  template: `
    <ui-feature-page pageName="About Component State">
      <ui-markdown-block source="components/overview.md"> </ui-markdown-block>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {
  store = inject(payStore);
}
