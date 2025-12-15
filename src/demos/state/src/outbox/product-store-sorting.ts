import {
  signalStoreFeature,
  withState,
  withMethods,
  patchState,
} from '@ngrx/signals';
import { ApiProduct } from './product-api';

type SortKey = 'name' | 'price';
type SortOrder = 'asc' | 'desc';

export function withProductSorting() {
  return signalStoreFeature(
    withState({
      sortKey: 'price' as SortKey,
      sortOrder: 'desc' as SortOrder,
      isLoading: true,
    }),
    withMethods((store) => ({
      setSortKey: (key: SortKey) => {
        if (store.sortOrder() === 'asc') {
          patchState(store, { sortKey: key, sortOrder: 'desc' });
        } else {
          patchState(store, { sortKey: key, sortOrder: 'asc' });
        }
      },
      setSortOrder: (order: SortOrder) =>
        patchState(store, { sortOrder: order }),
    })),
  );
}

export function sortEntities(
  entities: ApiProduct[],
  sortKey: SortKey,
  sortOrder: SortOrder,
) {
  return Object.values(entities).sort((a, b) => {
    if (sortKey === 'price') {
      if (a[sortKey] < b[sortKey]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    } else {
      if (a[sortKey].toLowerCase() < b[sortKey].toLowerCase()) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    }
  });
}
