import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-{{name}}-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `
    <ui-feature-page pageName="About {{startCase name}}">
      <p>{{startCase name}} Home Page</p>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
