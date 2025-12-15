import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { Authentication } from '@app-auth/authentication';

import { getRouterSelectors } from '@ngrx/router-store';
import { SectionNav } from './internal/section-nav';
import { sectionStore } from './internal/store';
import { UiBadgeDirective } from '@app-ui/badges/badge';
import { Flower } from './internal/flower';
import { prefsStore } from '../internal/prefs';
import { ThemePicker } from './internal/theme-picker';
import { themeStore } from './internal/theme-store';
import { RouterLink } from '@angular/router';

type KbdKeysSpecificMap = {
  meta: string;
  alt: string;
  ctrl: string;
};
@Component({
  selector: 'ui-feature-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, UiBadgeDirective, Flower, SectionNav, ThemePicker, RouterLink],
  host: {
    class: 'drawer-content',
  },
  viewProviders: [sectionStore, themeStore],
  template: `
    <!-- Navbar -->
    <div class="flex flex-col  bg-base-100  ">
      <div class="flex flex-row gap-0  w-full bg-base-300  rounded-none h-1/12">
        <button
          (click)="prefsStore.toggleSideBar()"
          for="my-drawer-4"
          aria-label="open sidebar"
          class="btn btn-square rounded-none border-none bg-transparent border-0 "
        >
          <!-- Sidebar toggle icon -->
          @if (!prefsStore.sidebarCollapsed()) {
            <ng-icon class="rotate-180" name="solarMirrorRight" size="18px"></ng-icon>
          } @else {
            <ng-icon class="" name="solarMirrorRight" size="18px"></ng-icon>
          }
        </button>
        <a
          class="btn bg-transparent rounded-none text-md border-0    border-t-4 text-accent border-t-blue-500 uppercase font-black "
          routerLink="./"
        >
          {{ title() }}
        </a>

        <app-section-nav></app-section-nav>

        <div class="ml-auto flex flex-row gap-4">
          <div>
            <app-theme-picker />
          </div>
          <div class="">
            @if (authentication.isLoggedIn) {
              <button
                (click)="authentication.logout('/')"
                class="btn rounded-none bg-transparent border-0 border-t-4 border-t-success"
              >
                <ng-icon name="solarLogout3" size="16px" title="Log Out"></ng-icon>
              </button>
            } @else {
              <button
                (click)="authentication.login('/')"
                class="btn rounded-none bg-transparent border-0 border-t-4 border-t-warning"
              >
                <ng-icon name="solarLogin" size="16px" title="Log In"></ng-icon>
              </button>
            }
          </div>
        </div>
      </div>

      <div class="justify-items-end place-items-end">
        <div class="container mx-auto my-auto p-x-[3%] pt-[1.3%]">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
    <app-internal-ui-flower></app-internal-ui-flower>
  `,
  styles: ``,
})
export class FeatureShell implements OnInit {
  protected prefsStore = inject(prefsStore);
  title = input.required<string>();
  protected authentication = inject(Authentication);
  sectionName = input<string | undefined>(undefined);
  routeQueries = getRouterSelectors();
  macOS = computed(
    () => navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/),
  );

  kbdKeysSpecificMap = signal<KbdKeysSpecificMap>({
    meta: ' ',
    alt: ' ',
    ctrl: ' ',
  });

  // invokeSearch = output<void>();
  ngOnInit(): void {
    this.kbdKeysSpecificMap.update((m) => {
      m.meta = this.macOS() ? '⌘' : 'Ctrl';
      m.ctrl = this.macOS() ? 'Control' : 'Ctrl';
      m.alt = this.macOS() ? 'Option' : 'Alt';
      return m;
    });
  }
}
