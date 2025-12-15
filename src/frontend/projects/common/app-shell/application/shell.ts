import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterOutlet } from '@angular/router';
import { DialogService } from '@ngneat/dialog';
import { HotkeysService } from '@ngneat/hotkeys';
import { prefsStore } from '../../state/stores/preferences/prefs';
import { HelpComponent } from './internal/help';
import { NavLink } from './internal/nav-link';

import { profileStore } from '@app-auth/profile/profile';
import { NgIcon } from '@ng-icons/core';
import { routingStore } from './providers/routing-store';

@Component({
  selector: 'ui-application-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [prefsStore],
  imports: [RouterOutlet, NavLink, NgIcon],
  template: `
    <div class="drawer lg:drawer-open  bg-base">
      <input id="drawer-1" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content ">
        <label for="drawer-1" class="btn drawer-button inline-block lg:hidden">
          <ng-icon name="solarSettings"
        /></label>
        <div class="flex flex-col justify-start  align-top   ">
          <router-outlet />
        </div>
      </div>
      <div class="drawer-side is-drawer-close:overflow-visible w-full">
        <label for="drawer-1" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="h-1/12 w-full bg-base-300 "></div>
        <div class="flex min-h-full flex-col items-center bg-base-300 ">
          <!-- Sidebar content here -->
          @let routes = routingStore.routesToUse();

          <ul class="menu w-full">
            <!-- List item -->
            @for (route of routes; track $index) {
              @if (!route.data.hide) {
                <li>
                  <app-ui-internal-link [routeToDisplay]="route" [useExact]="route.path === ''" />
                </li>
              }
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class ApplicationShell {
  go(path: string) {
    this.#router.navigate([path]);
  }
  #router = inject(Router);
  #helpDialog = inject(DialogService);
  #hotkeysService = inject(HotkeysService);

  protected profileStore = inject(profileStore);
  protected routingStore = inject(routingStore);

  protected prefsStore = inject(prefsStore);

  constructor() {
    this.routingStore.initialize(this.#router.config);
    this.#hotkeysService.registerHelpModal(() => {
      this.#helpDialog.open(HelpComponent);
    }, 'h');
    this.#hotkeysService
      .addShortcut({
        keys: 'control.b',
        group: 'App',
        description: 'Toggle The Navigation Bar',
      })
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.prefsStore.toggleSideBar());

    effect(() => {
      const routes = this.routingStore.routesToUse();

      const keys = this.#hotkeysService
        .getShortcuts()
        .filter((s) => s.group === 'Pages')
        .map((s) => s.hotkeys)
        .flatMap((k) => k)
        .map((k) => k.keys);

      this.#hotkeysService.removeShortcuts(keys);

      routes.forEach((route, idx) => {
        this.#hotkeysService
          .addShortcut({
            group: 'Pages',
            keys: 'control.' + (idx + 1).toString(),

            description: `Navigate to ${route.data.pageTitle} Page`,
          })
          .subscribe(() => {
            this.go(route.path ?? '/');
          });
      });
    });
  }
}
