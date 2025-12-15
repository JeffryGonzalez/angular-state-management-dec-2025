import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StatusStore } from './state/status-store';

@Component({
  selector: 'app-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterOutlet],
  providers: [StatusStore],
  template: `
    @if (statusStore.message()) {
      <div class="alert alert-info">
        {{ statusStore.message() }}
      </div>
    }
    <div class="flex flex-row gap-4">
      <a routerLink="counter" class="btn btn-primary"> Counter </a>
      <a routerLink="todos" class="btn btn-primary"> Todos </a>
    </div>
    <router-outlet />
  `,
  styles: ``,
})
export class EventsComponent {
  statusStore = inject(StatusStore);
}
