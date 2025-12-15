import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { Authentication } from './authentication';
import { provideHttpClient, withXsrfConfiguration, withInterceptors } from '@angular/common/http';
import { secureApiInterceptor } from './secure-api-interceptor';
import * as authConstants from '@app-auth/constants';
import { profileStore } from './profile/profile';
export function provideAppAuth(): EnvironmentProviders {
  return makeEnvironmentProviders([
    profileStore,
    Authentication,
    provideHttpClient(
      withXsrfConfiguration({
        cookieName: authConstants.XSRF_COOKIE_NAME,
        headerName: authConstants.XSRF_HEADER_NAME,
      }),
      withInterceptors([secureApiInterceptor]),
    ),
  ]);
}
