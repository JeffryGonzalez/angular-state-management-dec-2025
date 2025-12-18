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
import { Authentication } from '@ht/auth/authentication';
import { NgIcon } from '@ng-icons/core';

import { RouterLink } from '@angular/router';
import { getRouterSelectors } from '@ngrx/router-store';

import { Flower } from './internal/flower';
import { SectionNav } from './internal/section-nav';
import { sectionStore } from './internal/store';
import { ThemePicker } from './internal/theme-picker';

import { SearchModal } from './internal/search-modal';
import { HotkeysService } from '@ngneat/hotkeys';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { prefsStore } from '../../state/stores/prefs';

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
  viewProviders: [sectionStore],
  template: `
    <!-- Navbar -->

    <div class="flex flex-row gap-0 rounded-none ">
      <label for="drawer-1" class="btn drawer-button lg:hidden">
        <ng-icon name="solarHamburgerMenu"
      /></label>

      <div class="hidden lg:inline">
        <label
          for="drawer-1"
          class="btn btn-square sm:hidden rounded-none border-none  border-0"
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
      </div>
      <div class="w-full">
        <app-section-nav [title]="title()"></app-section-nav>

        <div class=""></div>
      </div>
    </div>

    <div class=" bg-base-200   ">
      <ng-content></ng-content>
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
