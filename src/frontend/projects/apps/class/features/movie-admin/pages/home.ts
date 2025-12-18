import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { movieAdminStore } from '../stores/movie-big';
import { AdminMovieGrid } from './grids/admin-movie';
import { FeaturePage } from '@ht/features/feature-page';

@Component({
  selector: 'app-movie-admin-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, AdminMovieGrid],
  template: `
    <ui-feature-page pageName="About Movie Admin">
      <p class="text-lg font-bold p-4 text-secondary-content">Your Big Enterprisey Grid of Doom!</p>

      <app-movie-admin-grid />
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {
  protected store = inject(movieAdminStore);
}
