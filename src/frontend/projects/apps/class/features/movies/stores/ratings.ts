import { inject } from '@angular/core';
import { signalStore, type, withHooks } from '@ngrx/signals';
import { addEntity, removeEntity, withEntities } from '@ngrx/signals/entities';
import {
  eventGroup,
  Events,
  injectDispatch,
  on,
  withEffects,
  withReducer,
} from '@ngrx/signals/events';
import { RatingsListener } from './ratings-service';
import { tapResponse } from '@ngrx/operators';
import { withListenerState } from './listener-state.feature';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

// this is going to keep a list of all the ratings we get from the SSE,
// and have a way to see them, and delete one if we've seen.

export const ratingsCommands = eventGroup({
  source: 'Ratings SSE Commands',
  events: {
    startListening: type<void>(),
    stopListening: type<void>(),
  },
});

export const ratingsEvents = eventGroup({
  source: 'Ratings SSE Events',
  events: {
    newRating: type<MovieRatingInfo>(),
    ratingRemoved: type<string>(),
  },
});

export type MovieRatingInfo = {
  id: string;
  movie: {
    id: string;
    version: number;
  };
  rating: number;
};

export const ratingsStore = signalStore(
  withEntities<MovieRatingInfo>(),
  withDevtools('ratings-stuff'),
  withReducer(
    on(ratingsEvents.newRating, (evt) => addEntity(evt.payload)),
    on(ratingsEvents.ratingRemoved, (evt) => removeEntity(evt.payload)),
  ),
  withListenerState(),
  withHooks({
    onInit() {
      const events = injectDispatch(ratingsCommands);
      events.startListening();
    },
    onDestroy() {
      const events = injectDispatch(ratingsCommands);
      events.stopListening();
    },
  }),
);
