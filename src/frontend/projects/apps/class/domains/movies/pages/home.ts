import { DatePipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { List } from './lists/list';
import { ApiMovie } from './lists/types';
import { HttpClient, httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop'; // this is the stuff for you have rxjs observables, and want to make a signal.
import { map } from 'rxjs';

@Component({
  selector: 'app-movies-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, DatePipe, List, JsonPipe],
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
            <app-movie-list [movies]="movies.value()"></app-movie-list>
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
  // The pound sign here is the "standard" way to make a private field in a class.
  // there is no such thing Javascript as "private". Typescript made that up.
  #httpClient = inject(HttpClient);
  // If this is readonly data, and I just want to use this, I have no problem with the following:
  // there are three versions of this, resource, rxResource, and httpResource

  // Type Safety Theater - this is a late bound call.
  protected movies = httpResource<ApiMovie[]>(() => '/api/movies');
  // "If we let our developers make HTTP calls from the component, what if we end up with 20 components making the same http call"

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
