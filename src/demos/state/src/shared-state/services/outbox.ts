import { effect } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { RxMethod } from '@ngrx/signals/rxjs-interop';
import { withLoadingModes } from './loading-modes';
type ApiOps<T> = {
  add: RxMethod<{ tempId: string; item: Omit<T, 'id'> }> | undefined;
  delete: RxMethod<T> | undefined;
  update?: RxMethod<T> | undefined;
};
export type ChangeOps = 'add' | 'delete' | 'update';

type PendingChange<T> = Map<ChangeOps, T[]>;
export function withOutBox<T extends { id: string }>() {
  return signalStoreFeature(
    withLoadingModes(),
    withState({
      pendingChangeCount: 0,
      _apiMethods: {
        add: undefined,
        delete: undefined,
        update: undefined,
      } as ApiOps<T>,
      outbox: {} as Record<ChangeOps, T[]>,
    }),
    withMethods((state) => {
      return {
        _addApiMethods: (api: ApiOps<T>) => {
          patchState(state, { _apiMethods: api });
        },
        _addOutboxDeletion: (el: T) => {
          const changes = state.outbox();
          changes['delete'] = [el, ...(changes['delete'] || [])];

          patchState(state, {
            outbox: changes,
            pendingChangeCount: state.pendingChangeCount() + 1,
          });
        },
        _removeOutboxDeletion: (el: T) => {
          const changes = state.outbox();
          const deletions = changes['delete'];
          if (deletions) {
            const newDeletions = deletions.filter((d) => d.id !== el.id);
            changes['delete'] = newDeletions;
            patchState(state, {
              outbox: changes,
              pendingChangeCount: state.pendingChangeCount() - 1,
              requestStatus: 'idle',
            });
          }
        },
        _addOutboxUpdate: (update: T) => {
          const changes = state.outbox();
          changes['update'] = [...(changes['update'] || []), update];
          patchState(state, {
            outbox: changes,
            pendingChangeCount: state.pendingChangeCount() + 1,
          });
        },
        _removeOutboxUpdate: (update: T) => {
          const changes = state.outbox();

          const newUpdates = changes['update'].filter(
            (d) => d.id !== update.id,
          );
          changes['update'] = newUpdates;
          patchState(state, {
            outbox: changes,
            pendingChangeCount: state.pendingChangeCount() - 1,
            requestStatus: 'idle',
          });
        },
        _addOutboxAddition: (tempId: string, addition: Omit<T, 'id'>) => {
          const changes = state.outbox();

          const updates = changes['add'] || [];
          changes['add'] = [...updates, { ...addition, id: tempId } as T];

          patchState(state, {
            outbox: changes,
            pendingChangeCount: state.pendingChangeCount() + 1,
          });
        },
        _removeOutboxAddition: (tempId: string) => {
          const changes = state.outbox();

          const newAdditions = changes['add'].filter((d) => d.id !== tempId);
          changes['add'] = newAdditions;
          patchState(state, {
            outbox: changes,
            pendingChangeCount: state.pendingChangeCount() - 1,
            requestStatus: 'idle',
          });
        },
      };
    }),

    withHooks({
      onInit: (store) => {
        effect(() => {
          const idle = store.requestStatus() === 'idle';
          const hasPendingChanges = store.pendingChangeCount() > 0;

          if (idle && hasPendingChanges) {
            // do the additions, then the updates, then the deletions
            const outbox = store.outbox();
            if (outbox['add']) {
              const additions = outbox['add'];
              if (additions && store._apiMethods().add) {
                additions.forEach((item) => {
                  patchState(store, { requestStatus: 'mutating' });
                  store._apiMethods().add!({
                    tempId: item.id,
                    item: item,
                  });
                });
                return;
              }
            }
            if (outbox['update']) {
              const updates = outbox['update'];
              if (updates && store._apiMethods().update) {
                const updateMe = updates.pop();
                outbox['update'] = updates;
                patchState(store, {
                  outbox: outbox,
                  requestStatus: 'mutating',
                });

                store._apiMethods().update!(updateMe!);

                return;
              }
            }
            if (outbox['delete']) {
              const deletions = outbox['delete'];
              if (deletions && store._apiMethods().delete) {
                const deleteMe = deletions.pop();
                outbox['delete'] = deletions;

                store._apiMethods().delete!(deleteMe!);
                patchState(store, {
                  requestStatus: 'mutating',
                  outbox: outbox,
                });
              }
              return;
            }
          }
        });
      },
    }),
  );
}
