import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-signal-store-pages-one',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="Basics">
    <p>Defining a Store</p>
    <p>Defining State</p>
    <p>Providing Stores</p>
  </ui-feature-page>`,
  styles: ``,
})
export class SignalStoreOnePage {}
