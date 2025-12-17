/* eslint-disable @softarc/sheriff/dependency-rule */
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { signalStoreFeature } from '@ngrx/signals';
import { withEffects, Events } from '@ngrx/signals/events';
import { ratingsCommands, ratingsEvents } from './ratings';
import { RatingsListener } from './ratings-service';
import { Store } from '@ngrx/store';
import { notificationEvents } from '@app-shell/application/notifications-feature';

export function withListenerState() {
  return signalStoreFeature(
    withEffects(
      (
        store,
        events = inject(Events),
        service = inject(RatingsListener),
        reduxStore = inject(Store),
      ) => {
        return {
          display$: events.on(ratingsEvents.newRating).pipe(
            tapResponse({
              next: (a) =>
                reduxStore.dispatch(
                  notificationEvents.displayNotificationForAll({
                    payload: {
                      from: 'Movies',
                      message: `A Movie Got a ${a.payload.rating} Star Rating Rating`,
                    },
                  }),
                ),
              error: (e) => console.log(e),
            }),
          ),
          start$: events.on(ratingsCommands.startListening).pipe(
            tapResponse({
              next: () => service.start(),
              error: (error) => console.log(error),
            }),
          ),
          stopListening$: events.on(ratingsCommands.stopListening).pipe(
            tapResponse({
              next: () => service.close(),
              error: (e) => console.log(e),
            }),
          ),
        };
      },
    ),
  );
}
