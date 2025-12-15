import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ErrorDisplayComponent } from './components/error-display';

@Component({
  selector: 'app-root',
  template: `
    <div class="w-full h-full">
      <div class="flex m-8 ">
        <div class="flex-none width-1/3 p-4 m-2">
          <div class="flex flex-col gap-4 p-2">
            <a
              routerLink=""
              class="link"
              [routerLinkActive]="['uppercase']"
              [routerLinkActiveOptions]="{ exact: true }"
            >
              Home
            </a>
            <a
              routerLink="ephemeral-user"
              class="link"
              [routerLinkActive]="['uppercase']"
            >
              Ephemeral User
            </a>
          </div>
          <div class="flex flex-col gap-4 p-2">
            <a
              routerLink="outbox"
              class="link"
              [routerLinkActive]="['uppercase']"
            >
              Outbox
            </a>
            <a
              routerLink="todo-list"
              class="link"
              [routerLinkActive]="['uppercase']"
            >
              Todo List
            </a>
            <a
              routerLink="anti-patterns"
              class="link"
              [routerLinkActive]="['uppercase']"
            >
              API Patterns
            </a>
            <a
              routerLink="ngrx-events"
              class="link"
              [routerLinkActive]="['uppercase']"
            >
              Ngrx Events
            </a>
          </div>
        </div>
        <div class="w-full h-full">
          <app-error-display />
          <main
            class="container mx-auto   m-4 p-8 border-2 border-accent rounded-3xl "
          >
            <div class="">
              <router-outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  `,

  styles: [],
  imports: [RouterOutlet, RouterLink, RouterLinkActive, ErrorDisplayComponent],
})
export class AppComponent {}
