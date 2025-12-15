import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ephemeral-user',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <p class="text-xl font-bold">Ephemeral User State</p>
    <div class="flex flex-row gap-4 p-2">
      <a
        [routerLinkActive]="['uppercase']"
        routerLink="sort-filter-one"
        class="link"
        >Component State</a
      >
      <a
        [routerLinkActive]="['uppercase']"
        routerLink="sort-filter-two"
        class="link"
        >Service State
      </a>
      <a
        [routerLinkActive]="['uppercase']"
        routerLink="sort-filter-three"
        class="link"
        >Service State Persisted</a
      >
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class EphemeralUserComponent {}
