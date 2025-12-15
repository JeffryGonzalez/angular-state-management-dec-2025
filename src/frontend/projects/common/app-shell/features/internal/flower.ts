import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { DialogService } from '@ngneat/dialog';
import { Authentication } from '@app-auth/authentication';
import { SearchModal } from './search-modal';

type KbdKeysSpecificMap = {
  meta: string;
  alt: string;
  ctrl: string;
};

@Component({
  selector: 'app-internal-ui-flower',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, SearchModal],
  template: `
    <div class="fab fab-flower">
      <!-- a focusable div with tabindex is necessary to work on all browsers. role="button" is necessary for accessibility -->
      <div tabindex="0" role="button" class="btn btn-circle btn-lg">
        <svg
          aria-label="New"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="size-6"
        >
          <path
            d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
          />
        </svg>
      </div>

      <!-- Main Action button replaces the original button when FAB is open -->
      <button class="fab-main-action btn btn-circle btn-lg ">
        <ng-icon name="solarQuestionCircle" size="36px" title="Go"></ng-icon>
      </button>

      <!-- buttons that show up when FAB is open -->
      @if (authentication.isLoggedIn === false) {
        <div class="tooltip tooltip-left" [attr.data-tip]="'Log In to the Application'">
          <button (click)="authentication.login('/')" class="btn btn-circle btn-lg" title="Login">
            <ng-icon aria-label="Login" name="solarLogin" size="36px"></ng-icon>
          </button>
        </div>
      } @else {
        <div class="tooltip tooltip-left" [attr.data-tip]="'Log Out of the Application'">
          <button (click)="authentication.logout('/')" class="btn btn-circle btn-lg" title="Logout">
            <ng-icon aria-label="Logout" name="solarLogout" size="36px"></ng-icon>
          </button>
        </div>
      }
      <div
        class="tooltip tooltip-left"
        [attr.data-tip]="'Search ' + kbdKeysSpecificMap().meta + 'K'"
      >
        <button class="btn btn-circle btn-lg" title="Search" (click)="openSearch()">
          <ng-icon aria-label="Search" name="solarGlasses" size="36px"></ng-icon>
        </button>
      </div>
      <div class="tooltip tooltip-left" [attr.data-tip]="'For Help Hit h'">
        <button class="btn btn-circle btn-lg" title="Keyboard shortcuts">
          <ng-icon aria-label="Keyboard shortcuts" name="solarKeyboard" size="36px"></ng-icon>
        </button>
      </div>
      <div class="tooltip tooltip-left" data-tip="Source Code">
        <a
          class="btn btn-circle btn-lg"
          title="Github Source"
          href="https://github.com/hypertheorytraining"
          target="_blank"
          rel="noopener"
        >
          <ng-icon aria-label="Github Source" name="solarLink" size="36px"></ng-icon>
        </a>
      </div>
    </div>
    <search-modal />
  `,
  styles: ``,
})
export class Flower implements OnInit {
  protected authentication = inject(Authentication);

  macOS = computed(
    () => navigator && navigator.userAgent && navigator.userAgent.match(/Macintosh;/),
  );
  searchModal = viewChild<SearchModal>(SearchModal);
  openSearch() {
    this.searchModal()?.showModal();
  }
  dialogService = inject(DialogService);
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
