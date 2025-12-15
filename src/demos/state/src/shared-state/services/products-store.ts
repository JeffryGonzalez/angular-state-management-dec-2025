/* eslint-disable @typescript-eslint/no-unused-vars */
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  removeEntity,
  setEntities,
  setEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, switchMap, tap } from 'rxjs';
import {
  setError,
  setIsIdle,
  setIsLoading,
  setIsMutating,
} from './loading-modes';
import { ChangeOps, withOutBox } from './outbox';
import { ProductsApi } from './product-api';
type ApiProduct = { id: string; name: string; price: number };
const SORT_KEYS = ['name', 'price'] as const;
type SORT_KEY = (typeof SORT_KEYS)[number];
const SORT_ORDERS = ['asc', 'desc'] as const;
type SORT_ORDER = (typeof SORT_ORDERS)[number];
export const ProductsStore = signalStore(
  withDevtools('ProductsStore'),

  withEntities<ApiProduct>(),
  withState({
    sortKey: 'price' as SORT_KEY,
    sortOrder: 'asc' as SORT_ORDER,
  }),

  withOutBox<ApiProduct>(),
  withMethods((state) => {
    const service = inject(ProductsApi);
    return {
      setSortKey: (key: SORT_KEY) => {
        if (state.sortOrder() === 'asc') {
          patchState(state, { sortKey: key, sortOrder: 'desc' });
        } else {
          patchState(state, { sortKey: key, sortOrder: 'asc' });
        }
      },
      setSortOrder: (order: SORT_ORDER) =>
        patchState(state, { sortOrder: order }),
      addProduct: (product: Omit<ApiProduct, 'id'>) => {
        state._addOutboxAddition(crypto.randomUUID(), product);
      },
      _addProduct: rxMethod<{
        tempId: string;
        item: Omit<ApiProduct, 'id'>;
      }>(
        pipe(
          tap(() => {
            patchState(state, setIsMutating());
          }),
          mergeMap((args: { tempId: string; item: Omit<ApiProduct, 'id'> }) => {
            return service.addProduct(args.item).pipe(
              tapResponse({
    next: (product: ApiProduct) => {
        patchState(state, setEntity(product), setIsIdle());
        state._removeOutboxAddition(args.tempId);
    },
    error: () => patchState(state, setError('Could not add'))
}),
            );
          }),
        ),
      ),
      _loadProducts: rxMethod<void>(
        pipe(
          switchMap(() =>
            service.getProducts().pipe(
              tapResponse({
    next: (products: ApiProduct[]) => {
        patchState(state, setEntities(products), setIsIdle());
    },
    error: () => patchState(state, setError('Could not load'))
}),
            ),
          ),
        ),
      ),

      deleteProduct: (p: ApiProduct) => {
        state._addOutboxDeletion(p);
      },
      _deleteProduct: rxMethod<ApiProduct>(
        pipe(
          mergeMap((p: ApiProduct) =>
            service.deleteProduct(p.id).pipe(
              tapResponse({
    next: () => {
        patchState(state, removeEntity(p.id), setIsIdle());
        state._removeOutboxDeletion(p);
    },
    error: () => {
        patchState(state, setError('Could not delete'));
        state._removeOutboxDeletion(p);
    }
}),
            ),
          ),
        ),
      ),
      doublePrice: (p: ApiProduct) => {
        const updatedProduct = { ...p, price: p.price * 2 };

        state._addOutboxUpdate(updatedProduct);
      },
      _doublePrice: rxMethod<ApiProduct>(
        pipe(
          tap(() => {
            patchState(state, setIsMutating());
          }),
          mergeMap((p: ApiProduct) =>
            service.updateProduct(p).pipe(
              tapResponse({
    next: (product: ApiProduct) => {
        patchState(state, setEntity(product), setIsIdle());
        state._removeOutboxUpdate(product);
    },
    error: () => {
        patchState(state, setError('Could not update'));
        state._removeOutboxUpdate(p);
    }
}),
            ),
          ),
        ),
      ),
    };
  }),
  withComputed((state) => ({
    productList: computed(() => {
      const products = state.entities();

      const changes = state.outbox();

      const additions = changes['add'] || [];
      const deletions = changes['delete'] || [];
      const updates = changes['update'] || [];
      const stable = state.entities();

      // create a new array with the items from additions, deletions, and updates replacing the stable items
      const all = [
        ...additions,
        ...stable.filter((p) => !deletions.some((d) => d.id === p.id)),
        ...updates,
      ];

      const changeMap = {
        stable: stable.map((p) => p.id),
        additions: additions.map((p) => p.id),
        deletions: deletions.map((p) => p.id),
        updates: updates.map((p) => p.id),
      };

      if (state.sortKey() === 'name') {
        all.sort((a, b) => {
          if (state.sortOrder() === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
      }
      if (state.sortKey() === 'price') {
        all.sort((a, b) => {
          if (state.sortOrder() === 'asc') {
            return a.price - b.price;
          } else {
            return b.price - a.price;
          }
        });
      }
      return { products: all || [], changes: changeMap };
    }),
  })),
  withHooks({
    onInit: (store) => {
      store._addApiMethods({
        add: store._addProduct,
        delete: store._deleteProduct,
        update: store._doublePrice,
      });

      patchState(store, setIsLoading());
      store._loadProducts();

      //   effect((cleanup) => {
      //     const timer = setInterval(() => {
      //       if (store.requestStatus() === 'idle') {
      //         patchState(store, setIsBackgroundFetching());
      //         store._loadProducts();
      //       }
      //     }, 5000);
      //     cleanup(() => {
      //       clearInterval(timer);
      //     });
      //   });
    },
  }),
);
