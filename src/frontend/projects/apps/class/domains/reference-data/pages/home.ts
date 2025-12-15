import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { MarkdownComponent } from 'ngx-markdown';
import { MarkdownBlockComponent } from '@app-ui/markdown/block';

@Component({
  selector: 'app-reference-data-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MarkdownComponent, MarkdownBlockComponent],
  template: `
    <ui-feature-page pageName="About Reference Data">
      <ui-markdown-block source="reference/overview.md"></ui-markdown-block>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
