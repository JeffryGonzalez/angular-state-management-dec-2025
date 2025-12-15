import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { MarkdownBlockComponent } from '@app-ui/markdown/block';

@Component({
  selector: 'app-home-pages-this-class',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MarkdownBlockComponent],
  template: `<ui-feature-page pageName="Plan for this Class">
    <ui-markdown-block source="home/this-class.md"></ui-markdown-block>
  </ui-feature-page>`,
  styles: ``,
})
export class ThisClassPage {}
