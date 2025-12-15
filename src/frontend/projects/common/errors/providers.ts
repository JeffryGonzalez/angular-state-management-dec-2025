import { EnvironmentProviders, ErrorHandler, makeEnvironmentProviders } from '@angular/core';
import { errorsStore } from './store';
import { GlobalErrorHandler } from './internal/global-error-handler';

export function provideAppErrors(): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: errorsStore, useClass: errorsStore },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ]);
}
