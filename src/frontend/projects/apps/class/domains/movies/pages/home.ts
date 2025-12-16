import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { List } from './lists/list';
import { ApiMovie } from './lists/types';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'app-movies-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, DatePipe, List],
  template: `
    <ui-feature-page pageName="The Movies">
      @if (movies.hasValue()) {
        <app-movie-list [movies]="movies.value()"></app-movie-list>
      } @else {
        @if (movies.isLoading()) {
          <p>Please stand by... getting your movies...</p>
        }
      }
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {
  // If this is readonly data, and I just want to use this, I have no problem with the following:
  // there are three versions of this, resource, rxResource, and httpResource

  // Type Safety Theater - this is a late bound call.
  movies = httpResource<ApiMovie[]>(() => '/api/movies');
  // "If we let our developers make HTTP calls from the component, what if we end up with 20 components making the same http call"

  // We want a way to filter and sort - maybe make that persistent.
  // then talk about moving the data into a "store" and why you would
  // and then do a mutation based on this - we want the user to be able to add a review for a movie.
}
