import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { isDevMode } from '@angular/core';
async function enableMocking() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/browser');
    console.info('Starting the mock service worker since you are in development mode.');
    return await worker.start({
      quiet: false,
      onUnhandledRequest: 'bypass',
      waitUntilReady: true,
    });
  }
  return;
}
enableMocking().then(() => bootstrapApplication(App, appConfig).catch((err) => console.error(err)));
