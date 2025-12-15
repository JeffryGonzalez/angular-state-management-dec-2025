import { Component, signal } from '@angular/core';

import { form, Field, required, maxLength, minLength } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { UiFormHintDirective } from './input-hint';
import { InputErrorDisplayComponent } from './ui-error-display';
import { PersonalInformation } from '@app-auth/profile/profile';

@Component({
  selector: 'app-identity-create-profile',
  imports: [Field, JsonPipe, UiFormHintDirective, InputErrorDisplayComponent],
  template: `
    <form (submit)="onSubmitForm($event)">
      <div class="space-y-12">
        <div class="border-b border-white/10 pb-12">
          <h2 class="text-base/7 font-semibold text-white">About You</h2>
          <p class="mt-1 text-sm/6 text-gray-400">
            This will be used by the support techs when helping you with any problems you may have.
          </p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <label for="username" class="block text-sm/6 font-medium text-white"
                >First Name</label
              >
              <div class="mt-2">
                <input
                  uiFormHint
                  type="text"
                  [field]="theForm.firstName"
                  class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6 input"
                />
                <ui-input-error-display [formField]="theForm.firstName()"></ui-input-error-display>
              </div>
            </div>
            <div class="sm:col-span-4">
              <label for="lastName" class="block text-sm/6 font-medium text-white">Last Name</label>
              <div class="mt-2">
                <input
                  type="text"
                  uiFormHint
                  [field]="theForm.lastName"
                  class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6 input"
                />
                <ui-input-error-display [formField]="theForm.lastName()"></ui-input-error-display>
              </div>
            </div>
            <div class="sm:col-span-4">
              <label for="lastName" class="block text-sm/6 font-medium text-white"
                >Middle Initial</label
              >
              <div class="mt-2">
                <input
                  type="text"
                  [field]="theForm.mi"
                  class="block min-w-0 w-16 bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6 input"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <pre>{{ theForm().value() | json }}</pre>
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm/6 font-semibold text-white">Cancel</button>
        <button
          type="submit"
          class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  `,
  styles: ``,
})
export class IdentityCreateProfileComponent {
  onSubmitForm(event: SubmitEvent) {
    event.preventDefault();
  }

  personalInfo = signal<PersonalInformation>({
    firstName: '',
    lastName: '',
    mi: '',
  });

  theForm = form(this.personalInfo, (schema) => {
    required(schema.firstName, { message: 'First name is required' });
    maxLength(schema.firstName, 50, { message: 'First name must be less than 50 characters' });
    minLength(schema.firstName, 2, { message: 'First name must be at least 2 characters' });

    required(schema.lastName, { message: 'Last name is required' });
    maxLength(schema.mi, 1, { message: 'Middle initial must be a single character' });
  });
}
