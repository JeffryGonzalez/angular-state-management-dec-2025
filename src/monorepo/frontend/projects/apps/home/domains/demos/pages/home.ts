import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UiCardBasic } from '@app-ui/cards/card-basic';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-demos-pages-greeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [UiCardBasic, FeaturePage],
  template: ` <ui-feature-page pageName="Class Demos"> </ui-feature-page>`,
  styles: ``,
})
export class HomePage {}
