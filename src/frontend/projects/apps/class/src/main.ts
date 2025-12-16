import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { isDevMode } from '@angular/core';

// My app is using apis, but they are slow and I don't want to harsh my mellow.
// The other API does weird things in production, but I "can't reproduce"
// I am ahead of the API being developed. I actually like this.
async function enableMocking() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    console.info('Starting the mock service worker since you are in development mode.');
    return await worker.start({
      quiet: false, // be quiet. don't log out a bunch of stuff to the console.
      onUnhandledRequest: 'bypass', // if I don't have fake handler, just really send the request.
      //waitUntilReady: true,
    });
  }
  return;
}
enableMocking().then(() => bootstrapApplication(App, appConfig).catch((err) => console.error(err)));
