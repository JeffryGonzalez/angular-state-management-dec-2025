import { signalStoreFeature, type } from '@ngrx/signals';
import { EntityState, setEntity } from '@ngrx/signals/entities';

import { on, withReducer } from '@ngrx/signals/events';
import { featureErrorEvents } from './actions';
import { FeatureErrorEntity } from './internal';

export function withFeatureErrorReducer() {
  return signalStoreFeature(
    { state: type<EntityState<FeatureErrorEntity>>() },
    withReducer(
      on(featureErrorEvents.createFeatureError, ({ payload }) => {
        const entity: FeatureErrorEntity = {
          id: crypto.randomUUID(),
          ...payload,
        };
        return setEntity(entity);
      }),
    ),
  );
}
