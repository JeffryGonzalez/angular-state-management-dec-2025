import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-signals-pages-features',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="Signal Store Features">
    <ul>
      <li>Hooks</li>
      <li>Properties</li>
      <li>Computed</li>
      <li>Custom Features</li>
    </ul>
  </ui-feature-page>`,
  styles: ``,
})
export class FeaturesOfStorePage {}
