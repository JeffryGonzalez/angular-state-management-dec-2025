import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Authentication } from '@app-auth/authentication';
import { NgIcon } from '@ng-icons/core';

import { RouterLink } from '@angular/router';
import { getRouterSelectors } from '@ngrx/router-store';

import { Flower } from './internal/flower';
import { SectionNav } from './internal/section-nav';
import { sectionStore } from './internal/store';
import { ThemePicker } from './internal/theme-picker';
import { themeStore } from './internal/theme-store';
import { prefsStore } from '../../state/stores/preferences/prefs';
import { SearchModal } from './internal/search-modal';
import { HotkeysService } from '@ngneat/hotkeys';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type KbdKeysSpecificMap = {
  meta: string;
  alt: string;
  ctrl: string;
};
@Component({
  selector: 'ui-feature-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, Flower, SectionNav, ThemePicker, RouterLink, SearchModal],
  host: {
    class: 'drawer-content',
  },
  viewProviders: [sectionStore, themeStore],
  template: `
    <!-- Navbar -->
    <div class="flex flex-col w-full bg-base-100  ">
      <div class="flex flex-row gap-0   bg-base-300  rounded-none h-1/12">
        <label
          for="drawer-1"
          class="btn btn-square rounded-none border-none bg-transparent border-0"
          (click)="prefsStore.toggleSideBar()"
          for="sidebar-drawer"
          aria-label="open sidebar"
          class="btn btn-square rounded-none border-none bg-transparent border-0 "
        >
          <!-- Sidebar toggle icon -->
          @if (!prefsStore.sidebarCollapsed()) {
            <ng-icon class="rotate-180" name="solarMirrorRight" size="18px"></ng-icon>
          } @else {
            <ng-icon class="" name="solarMirrorRight" size="18px"></ng-icon>
          }
        </label>
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
        <div class="container  p-4">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
    <app-internal-ui-flower></app-internal-ui-flower>
    <search-modal #searchModal />
  `,
  styles: ``,
})
export class FeatureShell implements OnInit {
  protected prefsStore = inject(prefsStore);
  #hotkeysService = inject(HotkeysService);
  title = input.required<string>();
  protected authentication = inject(Authentication);
  sectionName = input<string | undefined>(undefined);
  routeQueries = getRouterSelectors();
  searchModal = viewChild<SearchModal>(SearchModal);
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
  constructor() {
    this.#hotkeysService
      .addShortcut({
        group: 'App',
        keys: 'meta.k',
        description: 'Open Search Modal',
      })
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.searchModal()?.showModal();
      });
  }
}
