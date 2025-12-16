import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Authentication } from '@app-auth/authentication';
import { FeatureShell } from '@app-shell/features/shell';

@Component({
  selector: 'app-movies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureShell, RouterOutlet],

  template: `
    <ui-feature-shell title="Movies Home">
      <div class="">
        <p>You are logged on as {{ auth.userName }} {{ auth.userId }}</p>
        <router-outlet></router-outlet>
      </div>
    </ui-feature-shell>
  `,
  styles: ``,
})
export class Home {
  auth = inject(Authentication);
}
