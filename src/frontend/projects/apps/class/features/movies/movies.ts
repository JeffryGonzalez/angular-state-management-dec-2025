import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FeatureShell } from '@ht/features/shell';
import { ratingsStore } from './stores/ratings';

@Component({
  selector: 'app-movies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureShell, RouterOutlet],

  template: `
    <ui-feature-shell title="Movies Home">
      <div class="">
        <router-outlet></router-outlet>
      </div>
    </ui-feature-shell>
  `,
  styles: ``,
})
export class Home {
  #ratingsListener = inject(ratingsStore);
}
