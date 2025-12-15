import { themeStore } from './theme-store';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-theme-picker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  template: `
    <div class="dropdown dropdown-hover dropdown-center  w-full">
      <div tabindex="0" role="button" class="btn bg-transparent border-none">
        <span class="mt-2"><ng-icon name="solarPaletteRound" size="16px"></ng-icon></span>
      </div>
      <ul tabindex="-1" class="dropdown-content bg-base-300">
        @for (theme of themeList(); track theme.value) {
          <li>
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn  w-full justify-start rounded-none text-primary"
              [aria-label]="theme.label"
              [value]="theme.value"
              (click)="store.set(theme.value)"
              [disabled]="theme.disabled"
            />
          </li>
        }
      </ul>
    </div>
  `,
  styles: ``,
})
export class ThemePicker {
  store = inject(themeStore);

  themeList = computed(() => {
    return this.store.themes.map((theme) => {
      return {
        label: this.toTitleCase(theme),
        value: theme,
        disabled: theme === this.store.theme(),
      };
    });
  });

  toTitleCase(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
