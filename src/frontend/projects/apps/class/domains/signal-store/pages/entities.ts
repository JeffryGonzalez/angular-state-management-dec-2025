import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-signals-pages-entities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="Signal Store with Entities"> </ui-feature-page>`,
  styles: ``,
})
export class EntitiesPage {}
