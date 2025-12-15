import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { FeatureError } from './types';

export const featureErrorEvents = eventGroup({
  source: 'Feature Error Handling',
  events: {
    createFeatureError: type<FeatureError>(),
  },
});
