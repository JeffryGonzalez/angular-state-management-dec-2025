import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-patterns-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: ` <ui-feature-page pageName="About Patterns"> </ui-feature-page> `,
  styles: ``,
})
export class HomePage {}
