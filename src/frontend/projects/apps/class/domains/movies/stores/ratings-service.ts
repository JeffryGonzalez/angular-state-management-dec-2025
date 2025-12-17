import { inject } from '@angular/core';
import { injectDispatch } from '@ngrx/signals/events';
import { MovieRatingInfo, ratingsEvents } from './ratings';

/**
 * This listens connects to and listens to the sse - when it gets messages, it's going to dispatch an action (event) to anyone who cares.
 */
export class RatingsListener {
  #eventSource = new EventSource('/api/movies/ratings-channel');
  #sseEvents = injectDispatch(ratingsEvents);
  // todo: dispatcher

  start() {
    this.#eventSource.addEventListener('rating', (event: MessageEvent) => {
      // this is the code that will run whenver the server rings our bell.

      const converted = JSON.parse(event.data) as unknown as MovieRatingInfo;
      converted.id = crypto.randomUUID();
      this.#sseEvents.newRating(converted);
    });
  }

  close() {
    this.#eventSource.close();
  }
}
