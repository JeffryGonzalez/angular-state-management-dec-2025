import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import { ErrorResponseEntity, RequestEntity } from './types';

export const OutboxStore = signalStore(
  withEntities<RequestEntity>(),
  withState({
    deadLetters: [] as ErrorResponseEntity[],
  }),
  withDevtools('GlobalOutboxStore'),
  withMethods((store) => {
    return {
      requestSent: (payload: RequestEntity) => {
        patchState(store, addEntity(payload));
      },
      responseReceived: (payload: RequestEntity) => {
        patchState(store, removeEntity(payload.id));
      },
      responseError: (payload: ErrorResponseEntity) => {
        const deadLetters = [payload, ...store.deadLetters()];
        patchState(store, removeEntity(payload.id), { deadLetters });
      },
      clearError: (errorId: string) => {
        const deadLetters = store.deadLetters().filter((e) => e.id !== errorId);
        patchState(store, { deadLetters });
      },
    };
  }),
);
