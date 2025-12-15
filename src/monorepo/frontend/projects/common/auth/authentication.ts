import { computed, DOCUMENT, inject } from '@angular/core';

import { httpResource } from '@angular/common/http';
import { User } from './internal/types';

export class Authentication {
  #document = inject(DOCUMENT);

  #user = httpResource(() => '/bff/user', {
    parse: (response) => response as User,
  }).asReadonly();

  readonly user = computed(() => this.#user.value());
  public login(redirectUrl: string): void {
    this.#document.location.href = `/bff/login?returnUrl=${redirectUrl}`;
  }

  public logout(redirectUrl: string): void {
    this.#document.location.href = `/bff/logout?returnUrl=${redirectUrl}`;
  }

  get isLoggedIn() {
    return this.user()?.isAuthenticated ?? false;
  }
  get isNotLoggedIn() {
    return !this.isLoggedIn;
  }
  get isSoftwareCenterEmployee() {
    return this.#hasRoles('softwarecenter');
  }

  hasRoles(...roles: string[]): boolean {
    return this.#hasRoles(...roles);
  }

  get userName() {
    return this.user()?.name;
  }
  get isSoftwareCenterManager() {
    return this.#hasRoles('softwarecenter', 'manager');
  }

  #hasRoles(...roles: string[]): boolean {
    if (!this.user()?.isAuthenticated) {
      return false;
    }
    const roleClaims = this.user()
      ?.claims.filter((c) => c.type === 'role')
      .map((c) => c.value.toLowerCase());
    return roles.every((role) => roleClaims?.includes(role.toLowerCase()));
  }
}
