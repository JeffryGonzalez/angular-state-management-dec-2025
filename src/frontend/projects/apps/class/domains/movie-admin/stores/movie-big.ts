import {
  patchState,
  signalStore,
  type,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject, isDevMode } from '@angular/core';
import { setEntities, withEntities } from '@ngrx/signals/entities';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mapResponse } from '@ngrx/operators';
import { exhaustMap, pipe, tap } from 'rxjs';
import { ApiMovie, movieRatingsList } from '../types';
import { MovieService } from './movie-service';
const storeRatingFilters = [...movieRatingsList, 'all'] as const;
type FilterSelections = (typeof storeRatingFilters)[number];
type SortableColumns = keyof Pick<ApiMovie, 'title' | 'director' | 'releaseDate'>;
type MovieStoreState = {
  filterByStarRating: FilterSelections;
  sortingBy: SortableColumns;
  sortDirection: 'asc' | 'desc';
};

export const movieAdminStore = signalStore(
  withDevtools('movies-admin-store'),
  // a feature that lets you add properties to your store for mostly convenience. They are usually non-signals. Can be a place to add rx stuff.
  withEntities({ entity: type<ApiMovie>(), collection: '_movies' }),
  withProps(() => ({
    developing: isDevMode(),
    filterByOptions: storeRatingFilters,
  })),
  withState<MovieStoreState>({
    filterByStarRating: 'all',
    sortingBy: 'title',
    sortDirection: 'asc',
  }),
  withMethods((store) => {
    const service = inject(MovieService);
    service.getAllMovies();
    return {
      setSortBy: (sortingBy: SortableColumns) => {
        const newDirection = store.sortDirection() === 'asc' ? 'desc' : 'asc';
        patchState(store, { sortingBy, sortDirection: newDirection });
      },

      _load: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            service.getAllMovies().pipe(
              tap(() => console.log('Fixing to get your data')),
              mapResponse({
                next(movies) {
                  patchState(store, setEntities(movies, { collection: '_movies' }));
                },
                error(error) {
                  console.log('Some Error', error); // todo: change the state - display an error or something.
                },
              }),
            ),
          ),
        ),
      ),
      //load: async () => fetch('/api/movies').then(m => m.json() as unknown as ApiMovie[]) ,
      setFilter: (filterByStarRating: FilterSelections) =>
        patchState(store, { filterByStarRating }),
    };
  }),
  withComputed((store) => {
    return {
      movies: computed(() => {
        const movies = store._moviesEntities();
        const sortKey = store.sortingBy();
        const direction = store.sortDirection() === 'asc' ? 1 : -1;
        return movies.toSorted((a, b) => {
          if (a[sortKey] < b[sortKey]) {
            return -1 * direction;
          } else if (a[sortKey] > b[sortKey]) {
            return 1 * direction;
          } else {
            return 0;
          }
        });
      }),
    };
  }),
  withHooks({
    onInit(store) {
      console.log('Getting your data...');
      store._load(); // time to make the donuts.  Whenver this store is initialized, load the data.
      // but I don't wan more than one these available at time
    },
  }),
);
