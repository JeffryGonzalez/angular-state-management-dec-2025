import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Authentication } from '@app-auth/authentication';
import type { AppRoute } from '@app-types/routing/app-routing';
import { prefsStore } from '@app-state/stores/preferences/prefs';
@Component({
  selector: 'app-ui-internal-link',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgIcon, RouterLinkActive],
  template: `
    @let route = linky();
    <a
      [routerLink]="route.path"
      #rla="routerLinkActive"
      class="is-drawer-close:tooltip is-drawer-close:tooltip-right m-0 p-0 border-l-4 "
      [routerLinkActive]="[
        'font-bold',
        'animate-[pulse_1s_ease-in-out_350ms]',
        'border-l-blue-500',
        'bg-transparent',
      ]"
      [class.border-neutral/50]="!rla.isActive"
      [routerLinkActiveOptions]="{ exact: useExact() }"
    >
      <span class="flex flex-row gap-4 items-start p-2">
        <div
          class="flex flex-row gap-2 items-center justify-start w-full"
          [attr.data-tip]="route.shortToolTip"
        >
          <ng-icon [name]="route.data.iconName" size="24px" class="w-fit"></ng-icon>
          @if (prefs.sidebarCollapsed() === false) {
            <div class=" flex flex-col pl-2">
              <span class="">
                {{ route.data.linkText }}
                @if (route.data.requiresAuth) {
                  @if (authentication.isLoggedIn === false) {
                    <ng-icon
                      [name]="'solarLockPassword'"
                      size="18px"
                      title="Requires You to Log In"
                      class="ml-2"
                    ></ng-icon>
                  }
                }
              </span>
              @if (route.data.linkDescription) {
                <span class="text-xs opacity-70">{{ route.data.linkDescription }}</span>
              }
            </div>
          }
        </div>
      </span>
    </a>
  `,
  styles: ``,
})
export class NavLink {
  protected authentication = inject(Authentication);
  routeToDisplay = input.required<AppRoute>();
  protected prefs = inject(prefsStore);
  useExact = input(false);

  protected linky = computed(() => {
    const link = this.routeToDisplay();
    let toolTip = link.data.linkText;
    const shortToolTip = link.data.linkText;
    // if it requires auth and roles, show the roles in the tooltip
    if (link.data.requiresAuth) {
      if (this.authentication.isNotLoggedIn) {
        toolTip += ' Requires You to Log In. ';
      }
      if (link.data.requiredRoles && link.data.requiredRoles.length > 0) {
        const roles = link.data.requiredRoles.join(', ');
        toolTip += ` Requires Roles: ${roles}`;
      }
    }

    return { ...link, toolTip, shortToolTip };
  });
}
