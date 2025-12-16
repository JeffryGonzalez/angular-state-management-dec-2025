import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FeatureShell } from '@app-shell/features/shell';

@Component({
  selector: 'app-movies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeatureShell, RouterOutlet],

  template: `
    <ui-feature-shell title="Movies Home">
      <div class="">
        <div
          class="flex flex-col font-black items-center justify-center p-8 bg-accent text-accent-content "
        >
          <h3 class="text-3xl">Movies Movies Movies!</h3>
        </div>

        <router-outlet></router-outlet>
      </div>
    </ui-feature-shell>
  `,
  styles: ``,
})
export class Home {
  content = input<unknown | undefined>(undefined);
}
