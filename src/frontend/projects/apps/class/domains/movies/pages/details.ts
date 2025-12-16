import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { ApiMovie } from './lists/types';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-movies-pages-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, JsonPipe],
  template: `<ui-feature-page pageName="Movie Details for Movie {{ id() }}">
    @if (movie.hasValue()) {
      <p>{{ movie.value().title }}</p>
    } @else {
      <p>Loading movie details for id {{ id() }}...</p>
    }

    @if (movie.error()) {
      <p class="text-error">Error loading movie details: {{ movie.error() | json }}</p>
    }
  </ui-feature-page>`,
  styles: ``,
})
export class DetailsPage {
  id = input.required<string>();

  movie = httpResource<ApiMovie>(() => '/api/movies/' + this.id());
}
