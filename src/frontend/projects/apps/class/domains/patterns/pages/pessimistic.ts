import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-patterns-pages-pessimistic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="Pessimistic"> </ui-feature-page>`,
  styles: ``,
})
export class PessimisticPage {}
