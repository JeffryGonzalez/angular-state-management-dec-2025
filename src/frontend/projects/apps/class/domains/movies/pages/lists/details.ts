import { httpResource } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

import { DevInfo } from '@app-ui/dev-info';
import { ApiMovie } from '../../types';
import { MovieListItem } from './display/list-item';
import { RouterLink } from '@angular/router';
import { AddRating } from './display/add-rating';

@Component({
  selector: 'app-movies-pages-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, DevInfo, MovieListItem, RouterLink, AddRating],
  template: `<ui-feature-page pageName="Movie Details for Movie {{ id() }}">
    @if (movie.hasValue()) {
      <div class="flex flex-col gap-4">
        <a routerLink=".." class="btn btn-sm btn-primary w-1/6">Back to List</a>
        <app-movie-list-item [movieToDisplay]="movie.value()"></app-movie-list-item>

        <app-movies-add-rating
          [movieId]="movie.value().id"
          [movieVersion]="movie.value().version"
        ></app-movies-add-rating>
      </div>
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
