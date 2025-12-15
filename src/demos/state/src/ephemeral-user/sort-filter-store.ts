import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type SortByOptions = 'name' | 'price';
type OrderByOptions = 'asc' | 'desc';
type SortFilterState = {
  sortBy: SortByOptions;
  orderBy: OrderByOptions;
};
export const SortFilterStore = signalStore(
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
);
