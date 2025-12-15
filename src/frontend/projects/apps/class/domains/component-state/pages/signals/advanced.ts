import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { ProseBlock } from '@app-ui/prose-block';

@Component({
  selector: 'app-components-pages-advanced',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, ProseBlock],
  template: `<ui-feature-page pageName="Nice!">
    <ui-prose-block>
      <h1>Hello</h1>
    </ui-prose-block>
  </ui-feature-page>`,
  styles: ``,
})
export class AdvancedPage {}
