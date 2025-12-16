import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { ApiMovie } from './lists/types';

import { DevInfo } from '@app-ui/dev-info';

@Component({
  selector: 'app-movies-pages-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, DevInfo],
  template: `<ui-feature-page pageName="Movie Details for Movie {{ id() }}">
    @if (movie.hasValue()) {
      <p>{{ movie.value().title }}</p>
    } @else {
      <p>Loading movie details for id {{ id() }}...</p>
    }

    @if (movie.error()) {
      <ui-dev-info [obj]="movie.error()">Showing the error stuff</ui-dev-info>
    }
  </ui-feature-page>`,
  styles: ``,
})
export class DetailsPage {
  // get /:id
  id = input.required<string>(); // violates what I said early - one thing meaning more than one thing. But this is so helpful, I'll allow it.

  movie = httpResource<ApiMovie>(() => '/api/movies/' + this.id());
}
