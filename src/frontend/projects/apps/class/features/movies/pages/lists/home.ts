import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { movieStore } from '../../stores/movie';

@Component({
  selector: 'app-movies-pages-lists',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <h2 class="text-2xl font-bold p-4">Movie Lists</h2>
    <div class="flex flex-row gap-2 p-2 pb-8">
      <a
        routerLinkActive="btn-primary"
        #rla2="routerLinkActive"
        [routerLinkActiveOptions]="{ exact: true }"
        [class.btn-secondary]="!rla2.isActive"
        routerLink="."
        class="btn"
        >List with HttpResource</a
      >
      <a
        routerLinkActive="btn-primary"
        #rla="routerLinkActive"
        [routerLinkActiveOptions]="{ exact: true }"
        [class.btn-secondary]="!rla.isActive"
        routerLink="./with-http-client"
        class="btn"
        >List with HttpClient</a
      >
    </div>
    <router-outlet></router-outlet>
  `,
  styles: ``,
})
export class ListsPage {
  protected store = inject(movieStore);
}
