import { getCookie } from './get-cookie';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import * as constants from './constants';
export function secureApiInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const secureRoutes = [getApiUrl('api'), getApiUrl('bff')];

  if (!secureRoutes.find((x) => request.url.startsWith(x))) {
    return next(request);
  }

  request = request.clone({
    headers: request.headers.set(constants.XSRF_HEADER_NAME, getCookie(constants.XSRF_COOKIE_NAME)),
  });

  return next(request);
}

function getApiUrl(path: string) {
  const backendHost = getCurrentHost();

  return `${backendHost}/${path}/`;
}

function getCurrentHost() {
  const host = globalThis.location.host;
  const url = `${globalThis.location.protocol}//${host}`;
  return url;
}
