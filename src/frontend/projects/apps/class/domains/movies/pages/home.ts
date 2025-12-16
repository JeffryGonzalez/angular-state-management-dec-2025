import { DatePipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  signal,
} from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { List } from './lists/list';
import { ApiMovie, MovieRatings } from './lists/types';
import { HttpClient, httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop'; // this is the stuff for you have rxjs observables, and want to make a signal.
import { map } from 'rxjs';
import { movieStore } from '../stores/movie';
import { DialogCloseDirective } from '@ngneat/dialog';
import { bigMovieStore } from '../stores/movie-big';

@Component({
  selector: 'app-movies-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [movieStore],
  imports: [FeaturePage, DatePipe, List, JsonPipe, DialogCloseDirective],
  template: `
    <ui-feature-page pageName="The Movies">
      <div class="flex flex-row items-center mb-4">
        <button
          class="btn btn-primary mr-2"
          [disabled]="doItWith() === 'httpResource'"
          (click)="doItWith.set('httpResource')"
        >
          httpResource
        </button>
        <button
          class="btn btn-primary mr-2"
          [disabled]="doItWith() === 'httpClient'"
          (click)="doItWith.set('httpClient')"
        >
          httpClient
        </button>
      </div>
      @switch (doItWith()) {
        @case ('httpResource') {
          @if (movies.hasValue()) {
            <h4 class="mb-4">Movies loaded with httpResource:</h4>
            <div class="flex flex-row gap-2">
              @for (opt of store.filterByOptions; track $index) {
                <button
                  class="btn btn-primary"
                  (click)="store.setFilter(opt)"
                  [disabled]="store.filterByStarRating() === opt"
                >
                  {{ opt }}
                </button>
              }
            </div>
            <p>Showing {{ numberOfMoviesShown() }} movies</p>

            <app-movie-list [movies]="filteredMovies()"></app-movie-list>
          } @else {
            @if (movies.isLoading()) {
              <p>Please stand by... getting your movies...</p>
            }
          }
        }
        @case ('httpClient') {
          <h4 class="mb-4">Movies loaded with HttpClient:</h4>
          <app-movie-list [movies]="moviesWithHttpClient()"></app-movie-list>
        }
      }
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {
  protected otherBigStore = inject(bigMovieStore);
  protected store = inject(movieStore);
  // The pound sign here is the "standard" way to make a private field in a class.
  // there is no such thing Javascript as "private". Typescript made that up.
  #httpClient = inject(HttpClient);
  // If this is readonly data, and I just want to use this, I have no problem with the following:
  // there are three versions of this, resource, rxResource, and httpResource

  // Type Safety Theater - this is a late bound call.
  protected movies = httpResource<ApiMovie[]>(() => '/api/movies');
  // "If we let our developers make HTTP calls from the component, what if we end up with 20 components making the same http call"

  filteredMovies = computed(() => {
    const movies = this.movies.value() || [];
    const selectedRating = this.store.filterByStarRating();

    if (selectedRating === 'all') {
      return this.movies.value() || [];
    }

    return movies.filter((m) => m.rating >= selectedRating);
  });

  numberOfMoviesShown = computed(() => {
    return this.filteredMovies()?.length;
  });
  // We want a way to filter and sort - maybe make that persistent.
  // then talk about moving the data into a "store" and why you would
  // and then do a mutation based on this - we want the user to be able to add a review for a movie.

  protected doItWith = signal<'httpResource' | 'httpClient'>('httpResource');

  moviesWithHttpClient = toSignal(
    this.#httpClient
      .get<ApiMovie[]>('/api/movies')
      .pipe(map((movies) => movies.sort((a, b) => a.title.localeCompare(b.title)))),
    {
      initialValue: [],
    },
  );
}
