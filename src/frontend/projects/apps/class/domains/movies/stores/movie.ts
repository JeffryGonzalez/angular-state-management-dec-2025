import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { movieRatingsList } from '../types';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { isDevMode } from '@angular/core';

const storeRatingFilters = [...movieRatingsList, 'all'] as const;
type FilterSelections = (typeof storeRatingFilters)[number];
type MovieStoreState = {
  starRatingSelected: FilterSelections;
};

export const movieStore = signalStore(
  withDevtools('movies-store'),
  // a feature that lets you add properties to your store for mostly convenience. They are usually non-signals. Can be a place to add rx stuff.
  withProps(() => ({
    developing: isDevMode(),
    filterByOptions: storeRatingFilters,
  })),
  withState<MovieStoreState>({
    starRatingSelected: 'all',
  }),
  withMethods((store) => {
    return {
      setStarRatingFilter: (starRatingSelected: FilterSelections) =>
        patchState(store, { starRatingSelected }),
    };
  }),
);
