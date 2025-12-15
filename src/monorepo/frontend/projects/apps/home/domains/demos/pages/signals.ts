import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-demos-pages-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="signals"> </ui-feature-page>`,
  styles: ``,
})
export class SignalsPage {}
