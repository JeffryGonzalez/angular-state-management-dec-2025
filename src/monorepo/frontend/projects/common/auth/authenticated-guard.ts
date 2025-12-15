import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  type ActivatedRouteSnapshot,
  type CanActivateFn,
  type RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { filterNullish } from '@app-types/rxjs/filter-nullish';
import { Authentication } from './authentication';

/**
 * This guard checks if the user is authenticated against our IDP.
 * It allows any user that is logged in.
 * @param _next
 * @param state
 * @returns
 */
export const authenticatedGuard: CanActivateFn = (
  _next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authenticationService = inject(Authentication);

  return toObservable(authenticationService.user).pipe(
    filterNullish(),
    map((user) => {
      if (user.isAuthenticated) {
        return true;
      }
      authenticationService.login(state.url);
      return false;
    }),
  );
};

/**
 * This guard ensures that the user is authenticated and has the role of a Software Center employee in their claims from the IDP.
 * @param _next
 * @param state
 * @returns
 */
export const authenticatedAsSoftwareEmployeeGuard: CanActivateFn = (
  _next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authenticationService = inject(Authentication);

  return toObservable(authenticationService.user).pipe(
    filterNullish(),
    map((user) => {
      if (user.isAuthenticated) {
        return authenticationService.isSoftwareCenterEmployee;
      }
      authenticationService.login(state.url);
      return false;
    }),
  );
};

/**
 * This guard ensures that the user is authenticated and has the role of a Software Center employee  and managerin their claims from the IDP.
 * @param _next
 * @param state
 * @returns
 */
export const authenticatedAsSoftwareManagerGuard: CanActivateFn = (
  _next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authenticationService = inject(Authentication);

  return toObservable(authenticationService.user).pipe(
    filterNullish(),
    map((user) => {
      if (user.isAuthenticated) {
        return authenticationService.isSoftwareCenterManager;
      }
      authenticationService.login(state.url);
      return false;
    }),
  );
};
