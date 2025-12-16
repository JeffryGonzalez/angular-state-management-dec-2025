import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-movies-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `
    <ui-feature-page pageName="About Movies">
      <p>This is the <code>home.ts</code> page.</p>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
