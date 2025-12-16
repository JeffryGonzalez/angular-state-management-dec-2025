import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { movieRatingsList } from '../pages/lists/types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { isDevMode } from '@angular/core';

const storeRatingFilters = [...movieRatingsList, 'all'] as const;
type FilterSelections = (typeof storeRatingFilters)[number];
type MovieStoreState = {
  filterByStarRating: FilterSelections;
};

export const movieStore = signalStore(
  withDevtools('movies-store'),
  // a feature that lets you add properties to your store for mostly convenience. They are usually non-signals. Can be a place to add rx stuff.
  withProps(() => ({
    developing: isDevMode(),
    filterByOptions: storeRatingFilters,
  })),
  withState<MovieStoreState>({
    filterByStarRating: 'all',
  }),
  withMethods((store) => {
    return {
      setFilter: (filterByStarRating: FilterSelections) =>
        patchState(store, { filterByStarRating }),
    };
  }),
);
