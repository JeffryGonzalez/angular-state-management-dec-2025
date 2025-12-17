import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-movie-admin-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `
    <ui-feature-page pageName="About Movie Admin">
      <p>Movie Admin Home Page</p>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
