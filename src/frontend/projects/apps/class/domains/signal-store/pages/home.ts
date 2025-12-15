import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { MarkdownBlockComponent } from '@app-ui/markdown/block';

@Component({
  selector: 'app-signal-store-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MarkdownBlockComponent],
  template: `
    <ui-feature-page pageName="About Signal Store">
      <ui-markdown-block source="signal-store/overview.md" />
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
