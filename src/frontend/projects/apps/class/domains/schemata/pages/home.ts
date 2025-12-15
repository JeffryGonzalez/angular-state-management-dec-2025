import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { MarkdownBlockComponent } from '@app-ui/markdown/block';

@Component({
  selector: 'app-schemata-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MarkdownBlockComponent],
  template: `
    <ui-feature-page pageName="About Schemata">
      <ui-markdown-block source="schemata/overview.md" />
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
