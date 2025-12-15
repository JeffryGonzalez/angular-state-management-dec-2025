import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';

import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHelpDeskProviders } from '@app-shell/providers/app-providers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHelpDeskProviders(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    isDevMode() ? provideStoreDevtools() : [],
  ],
};
