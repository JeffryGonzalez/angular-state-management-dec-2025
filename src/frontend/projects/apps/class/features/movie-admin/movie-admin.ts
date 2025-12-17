import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FeatureShell } from '@app-shell/features/shell';
@Component({
  selector: 'app-movie-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureShell, RouterOutlet],

  template: `
    <ui-feature-shell title="Movie Admin Home">
      <div class="">
        <router-outlet></router-outlet>
      </div>
    </ui-feature-shell>
  `,
  styles: ``,
})
export class Home {}
