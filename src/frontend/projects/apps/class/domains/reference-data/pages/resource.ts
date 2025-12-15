import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { MarkdownBlockComponent } from '@app-ui/markdown/block';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-reference-pages-resources',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MarkdownComponent, MarkdownBlockComponent],
  template: `<ui-feature-page pageName="Resources">
    <ui-markdown-block source="reference/resource-api.md"> </ui-markdown-block>
  </ui-feature-page>`,
  styles: ``,
})
export class ResourcePage {}
