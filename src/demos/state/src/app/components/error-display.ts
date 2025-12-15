import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FeatureErrorStore } from '../../shared/error-handling/store';

@Component({
  selector: 'app-error-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="toast toast-start ">
      @for (e of errorStore.entities(); track e.id) {
        <div class="alert alert-error z-50">
          <button
            class="btn btn-sm btn-circle btn-ghost"
            (click)="errorStore.clearError(e.id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a1 1 0 011 1v4a1 1 0 11-2 0v-4a1 1 0 011-1zm-1-4a1 1 0 112 0v3a1 1 0 11-2 0V5z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 012-2h8a2 2 0 012 2v1h1a1 1 0 110 2h-1v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8H3a1 1 0 110-2h1V5zm3-1a1 1 0 00-1-1H6a1 1 0 00-1 1v1h6V5H7z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <span>{{ e.message }}</span>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class ErrorDisplayComponent {
  errorStore = inject(FeatureErrorStore);
}
