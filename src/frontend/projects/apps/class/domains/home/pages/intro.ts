import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { MarkdownBlockComponent } from '@app-ui/markdown/block';

@Component({
  selector: 'app-home-pages-intro',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MarkdownBlockComponent],
  template: `<ui-feature-page pageName="intro">
    <ui-markdown-block source="home/intros.md" />
  </ui-feature-page>`,
  styles: ``,
})
export class IntroPage {}
