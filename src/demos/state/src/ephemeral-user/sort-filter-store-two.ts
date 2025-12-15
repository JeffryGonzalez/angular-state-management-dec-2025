import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

type SortByOptions = 'name' | 'price';
type OrderByOptions = 'asc' | 'desc';
type SortFilterState = {
  sortBy: SortByOptions;
  orderBy: OrderByOptions;
};
export const SortFilterStoreTwo = signalStore(
  withState<SortFilterState>({
    sortBy: 'name',
    orderBy: 'asc',
  }),
  withMethods((state) => ({
    setSortBy: (sortBy: SortByOptions) => {
      patchState(state, { sortBy });
      if (state.orderBy() === 'asc') {
        patchState(state, { orderBy: 'desc' });
      } else {
        patchState(state, { orderBy: 'asc' });
      }
    },
    setOrderBy: (orderBy: OrderByOptions) => patchState(state, { orderBy }),
  })),
  withHooks({
    onInit: (state) => {
      const savedJsonState = localStorage.getItem('sort-filter-state');
      if (savedJsonState) {
        const savedState = JSON.parse(savedJsonState);
        patchState(state, {
          sortBy: savedState.sortBy,
          orderBy: savedState.orderBy,
        });
      }
      watchState(state, (current) => {
        localStorage.setItem('sort-filter-state', JSON.stringify(current));
      });
    },
  }),
);
