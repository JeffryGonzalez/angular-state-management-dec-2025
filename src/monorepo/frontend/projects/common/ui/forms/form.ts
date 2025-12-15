import { Component, ChangeDetectionStrategy, input, viewChild } from '@angular/core';

@Component({
  selector: 'ui-form-fieldset',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <fieldset
      class="mt-10 fieldset bg-primary/10 border-base-300 rounded-box border w-full p-6 relative rounded-none"
    >
      <legend>
        <span class="text-lg font-semibold absolute -top-3  px-3 mb-6">
          <ng-content select=".legend"></ng-content>
        </span>
      </legend>
      <ng-content></ng-content>
      <ng-content select="ui-form-body"></ng-content>
    </fieldset>
  `,
  styles: ``,
})
export class FormFieldset {}
@Component({
  selector: 'ui-form-container ui-form-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: ` <div class="flex flex-col gap-6 w-full">
    <div class=" ">
      <ng-content></ng-content>
    </div>
  </div>`,
})
export class FormBody {}

@Component({
  selector: 'ui-form-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormFieldset],
  template: `
    <ui-form-fieldset>
      <div class="legend">
        <span
          class="legend shadow-lg shadow-neutral font-semibold relative -right-50 text-2xl  px-4"
          >{{ label() }}</span
        >
      </div>
      <ng-content></ng-content>
      <ng-content select="ui-form-body"></ng-content>
    </ui-form-fieldset>
  `,
  styles: `
    :host {
      .fieldset {
      }
      .legend {
      }
    }
  `,
})
export class FormContainer {
  label = input.required<string>();
  body = viewChild.required(FormBody, {
    debugName: 'FormContainer.body',
  });
}
