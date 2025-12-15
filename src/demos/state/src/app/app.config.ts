import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { addOutboxFeatureInterceptor } from '../shared/state/interceptors';

import { OutboxStore } from '@outbox';
import { FeatureErrorStore } from '../shared/error-handling/store';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([addOutboxFeatureInterceptor()])),
    OutboxStore,
    FeatureErrorStore,
  ],
};
