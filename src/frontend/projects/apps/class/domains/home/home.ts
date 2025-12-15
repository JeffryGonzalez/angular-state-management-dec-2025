import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FeatureShell } from '@app-shell/features/shell';
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureShell, RouterOutlet],

  template: `
    <ui-feature-shell title="Home">
      <div class="">
        <router-outlet></router-outlet>
      </div>
    </ui-feature-shell>
  `,
  styles: ``,
})
export class Home {}
