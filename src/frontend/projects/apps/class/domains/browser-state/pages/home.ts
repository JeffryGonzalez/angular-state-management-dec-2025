import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { MarkdownBlockComponent } from '@app-ui/markdown/block';

@Component({
  selector: 'app-browser-state-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MarkdownBlockComponent],
  template: `
    <ui-feature-page pageName="About Browser State">
      <ui-markdown-block source="browser/overview.md"> </ui-markdown-block>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
