import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { ApiMovie, movieRatingsList } from '../pages/lists/types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject, isDevMode } from '@angular/core';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { MovieService } from './movie-service';

import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mapResponse, tapResponse } from '@ngrx/operators';
import { exhaustMap, pipe, tap } from 'rxjs';
const storeRatingFilters = [...movieRatingsList, 'all'] as const;
type FilterSelections = (typeof storeRatingFilters)[number];
type MovieStoreState = {
  filterByStarRating: FilterSelections;
};

export const bigMovieStore = signalStore(
  withDevtools('movies-store'),
  // a feature that lets you add properties to your store for mostly convenience. They are usually non-signals. Can be a place to add rx stuff.
  withEntities<ApiMovie>(),
  withProps(() => ({
    developing: isDevMode(),
    filterByOptions: storeRatingFilters,
  })),
  withState<MovieStoreState>({
    filterByStarRating: 'all',
  }),
  withMethods((store) => {
    const service = inject(MovieService);
    service.getAllMovies();
    return {
      _load: rxMethod<void>(
        pipe(
          exhaustMap(() =>
            service.getAllMovies().pipe(
              tap(() => console.log('Fixing to get your data')),
              mapResponse({
                next(movies) {
                  patchState(store, setEntities(movies));
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
  withHooks({
    onInit(store) {
      console.log('Getting your data...');
      store._load(); // time to make the donuts.  Whenver this store is initialized, load the data.
      // but I don't wan more than one these available at time
    },
  }),
);
