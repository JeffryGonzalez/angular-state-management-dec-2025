import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'ui-input-error-display',
  template: `
    @if (formField().touched() && formField().invalid()) {
      <p class="mt-2 text-sm/6 text-red-500">
        @for (e of formField().errors(); track e) {
          <span>{{ e.message }}</span>
        }
      </p>
    }
  `,
})
export class InputErrorDisplayComponent {
  formField = input.required<FieldState<unknown>>();
}
