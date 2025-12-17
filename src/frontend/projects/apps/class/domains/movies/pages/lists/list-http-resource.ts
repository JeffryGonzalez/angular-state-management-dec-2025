import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { movieStore } from '../../stores/movie';
import { MoviesList } from './display/list';
import { httpResource } from '@angular/common/http';
import { ApiMovie } from '../../types';

@Component({
  selector: 'app-movies-lists-http-resource',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoviesList],
  template: `
    @if (moviesResource.isLoading()) {
      <p>Loading movies...</p>
      <
    }
    @if (moviesResource.error()) {
      <p>Error loading movies.</p>
    }

    @if (moviesResource.hasValue()) {
      <div class="flex flex-row items-center mb-4">
        @for (opt of store.filterByOptions; track opt) {
          <div class="join">
            <button
              (click)="store.setStarRatingFilter(opt)"
              [disabled]="store.starRatingSelected() === opt"
              class="join-item btn"
            >
              {{ opt === 'all' ? 'Show All' : opt + ' Stars' }}
            </button>
          </div>
        }
        <span class="bg-base-content text-base-100 rounded-full px-3 py-1 ml-4">
          Showing {{ numberOfDisplayedMovies() }} of {{ totalNumberOfMovies() }} movies
        </span>
      </div>
      <app-movies-list [movies]="moviesResource.value()"></app-movies-list>
    }
  `,
  styles: ``,
})
export class ListHttpResourcePage {
  store = inject(movieStore);

  moviesResource = httpResource<ApiMovie[]>(() => '/api/movies');

  filteredMovies = computed(() => {
    const rating = this.store.starRatingSelected();
    const movies = this.moviesResource.value() || [];
    if (rating === 'all') {
      return movies;
    }
    return movies.filter((movie) => movie.rating === Number(rating));
  });

  numberOfDisplayedMovies = computed(() => this.filteredMovies().length);

  totalNumberOfMovies = computed(() => this.moviesResource.value()?.length || 0);
}
