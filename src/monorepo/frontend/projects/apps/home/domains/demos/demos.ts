import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FeatureShell } from '@app-shell/features/shell';
@Component({
  selector: 'app-demos',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureShell, RouterOutlet],

  template: `
    <ui-feature-shell title="Demos">
      <div class="">
        <router-outlet></router-outlet>
      </div>
    </ui-feature-shell>
  `,
  styles: ``,
})
export class Demos {}
