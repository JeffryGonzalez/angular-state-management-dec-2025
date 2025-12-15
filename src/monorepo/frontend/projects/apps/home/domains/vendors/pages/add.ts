import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-demos-pages-forms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `
    <ui-feature-page pageName="Add Vendor">
      <p>Vendors Demo Page</p>
    </ui-feature-page>
  `,
  styles: ``,
})
export class AddPage {}
