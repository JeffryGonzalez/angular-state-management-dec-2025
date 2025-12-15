import { patchState, signalStore, withMethods } from '@ngrx/signals';

import { removeEntity, withEntities } from '@ngrx/signals/entities';
import { withFeatureErrorReducer } from './reducer';
import { FeatureErrorEntity } from './internal';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

export const FeatureErrorStore = signalStore(
  withDevtools('FeatureErrorStore'),
  withEntities<FeatureErrorEntity>(),
  withFeatureErrorReducer(),
  withMethods((store) => {
    return {
      clearError: (id: string) => patchState(store, removeEntity(id)),
    };
  }),
);
