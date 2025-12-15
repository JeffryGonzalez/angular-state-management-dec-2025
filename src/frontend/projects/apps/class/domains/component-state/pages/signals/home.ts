import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-component-state-pages-signals-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, RouterOutlet, RouterLink, RouterLinkActive],
  template: `<ui-feature-page pageName="Signals">
    <p>Signals Home Page</p>

    <div class="flex flex-row gap-4 justify-center">
      <a
        routerLinkActive="btn-primary"
        [routerLinkActiveOptions]="{ exact: true }"
        class="btn btn-ghost btn-sm"
        [routerLink]="['.']"
        >Home</a
      >
      <a routerLinkActive="btn-primary" class="btn btn-ghost btn-sm" [routerLink]="['computed']"
        >Computed, Effects, Etc.</a
      >
      <a routerLinkActive="btn-primary" class="btn btn-ghost btn-sm" [routerLink]="['linked']"
        >Linked</a
      >
    </div>
    <router-outlet />
  </ui-feature-page>`,
  styles: ``,
})
export class SignalsHomePage {}
