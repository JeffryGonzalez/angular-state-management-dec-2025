import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-catalog-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `
    <ui-feature-page pageName="About Catalog">
      <p>Catalog Home Page</p>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
