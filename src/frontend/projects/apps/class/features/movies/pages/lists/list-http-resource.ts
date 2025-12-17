import { Component, ChangeDetectionStrategy, inject, computed, input, effect } from '@angular/core';
import { movieStore } from '../../stores/movie';
import { MoviesList } from './display/list';
import { httpResource } from '@angular/common/http';
import { ApiMovie, MovieRatings, movieRatingsList } from '../../types';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies-lists-http-resource',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MoviesList, RouterLink],
  template: `
    @if (moviesResource.isLoading()) {
      <p>Loading movies...</p>
    }
    @if (moviesResource.error()) {
      <p>Error loading movies.</p>
    }

    @if (moviesResource.hasValue()) {
      <div class="flex flex-row items-center mb-4">
        @for (opt of store.filterByOptions; track opt) {
          <div class="join">
            <a
              [class.bg-secondary]="filterBy() === opt.toString()"
              [class.text-secondary-content]="filterBy() === opt.toString()"
              [routerLink]="['.']"
              [queryParams]="{ filterBy: opt }"
              class="join-item btn text-yellow-400"
            >
              {{ opt === 'all' ? 'Show All' : getRatingStars(opt) }}
            </a>
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
  filterBy = input.required<string>();

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
  getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  constructor() {
    effect(() => {
      const filter = this.filterBy();
      if (filter === 'all') {
        this.store.setStarRatingFilter('all');
        return;
      }
      const fNum = Number(filter) as MovieRatings;
      if (movieRatingsList.includes(fNum)) this.store.setStarRatingFilter(fNum);
    });
  }
}
