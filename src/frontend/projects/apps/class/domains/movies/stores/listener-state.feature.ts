import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { signalStoreFeature } from '@ngrx/signals';
import { withEffects, Events } from '@ngrx/signals/events';
import { ratingsCommands } from './ratings';
import { RatingsListener } from './ratings-service';

export function withListenerState() {
  return signalStoreFeature(
    withEffects((store, events = inject(Events), service = inject(RatingsListener)) => {
      return {
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
    }),
  );
}
