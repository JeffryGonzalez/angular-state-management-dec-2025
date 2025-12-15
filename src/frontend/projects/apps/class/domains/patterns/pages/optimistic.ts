import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-patterns-pages-optimistic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="Optimistic Locking"> </ui-feature-page>`,
  styles: ``,
})
export class OptimisticPage {}
