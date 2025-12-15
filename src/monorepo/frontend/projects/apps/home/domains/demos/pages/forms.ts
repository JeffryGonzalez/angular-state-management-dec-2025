import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { UiCardBasic } from '@app-ui/cards/card-basic';

@Component({
  selector: 'app-demos-pages-forms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: ` <ui-feature-page pageName="Forms"> </ui-feature-page> `,
  styles: ``,
})
export class FormsPage {}
