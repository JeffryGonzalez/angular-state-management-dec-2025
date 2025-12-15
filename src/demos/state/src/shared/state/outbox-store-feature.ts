import { computed, inject, Signal } from '@angular/core';
import {
  signalStoreFeature,
  withComputed,
  withMethods,
  withProps,
} from '@ngrx/signals';
import { OutboxStore } from './outbox-store';

export function withOutbox<T extends { id: string }>(
  name: string,
  entities: Signal<T[]>,
) {
  return signalStoreFeature(
    withProps(() => ({
      ob: inject(OutboxStore),
    })),
    withMethods((store) => {
      return {
        clearError: (errorId: string) => {
          store.ob.clearError(errorId);
        },
      };
    }),
    withComputed((store) => {
      return {
        outboxAugmentedList: computed(() => {
          const errors = store.ob.deadLetters().filter((d) => d.name === name);
          const obEntities = store.ob.entities().filter((a) => a.name === name);
          const deletions = obEntities
            .filter((e) => e.kind === 'deletion')
            .map((e) => e.body as string);
          const additions = obEntities
            .filter((e) => e.kind === 'addition')
            .map((e) => e.body as T);
          const updates = obEntities
            .filter((e) => e.kind === 'update')
            .map((e) => e.body as T);

          const entityUpdateErrors = errors
            .filter((e) => e.kind === 'update')
            .map((e) => ({
              message: e.message,
              kind: e.kind,
              id: (e.body as T).id,
              errorId: e.id,
            }));

          const entityDeleteErrors = errors
            .filter((e) => e.kind === 'deletion')
            .map((e) => ({
              message: e.message,
              kind: e.kind,
              id: e.body as string,
              errorId: e.id,
            }));
          const entityErrors = errors;
          const additionErrors = entityErrors.filter(
            (e) => e.kind === 'addition',
          );
          const data = entities().map((e) => ({
            item: e,
            meta: {
              isDeleting: deletions.includes(e.id),
              isUpdating: updates.some((u) => u.id === e.id),
              isMutating:
                deletions.some((a) => a === e.id) ||
                updates.some((u) => u.id === e.id),
              update: updates.find((u) => u.id === e.id),
              errors: [
                ...entityDeleteErrors.filter((er) => er.id === e.id),
                ...entityUpdateErrors.filter((er) => er.id === e.id),
              ],
            },
          }));
          const allEntityErrors = store.ob
            .deadLetters()
            .filter((e) => e.name === name && e.kind !== 'addition')
            .map((e) => ({
              message: e.message,
              kind: e.kind,
              id: e.body as string,
              errorId: e.id,
            }));
          const hasErrors =
            allEntityErrors.length > 0 || additionErrors.length > 0;
          return {
            data,
            isAdding: additions.length > 0,
            additions,
            additionErrors,
            allEntityErrors,
            hasErrors,
          };
        }),
      };
    }),
  );
}
