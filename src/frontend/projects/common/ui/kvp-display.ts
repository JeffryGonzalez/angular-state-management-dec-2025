import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';

@Component({
  selector: 'ui-kvp-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="border-2 border-base-300 bg-base-100 w-full ">
      <p class="text-sm font-black bg-base-300  text-base-content p-2">
        <span class="font-black text-lg">{{ label() }}:</span>
      </p>
      <div class="flex flex-col pl-8 py-4 items-start  ">
        <div class="flex flex-col items-start  ">
          @for (k of keys(); track $index) {
            <div class="flex flex-row gap-4 justify-items-center items-center">
              <p class=" font-black text-sm h-8    items-end    ">{{ k }}:</p>
              <p class=" text-sm text-base-content h-8    ">
                {{ item()[k] }}
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class KvpDisplay<T extends Record<string, unknown>> {
  label = input.required<string>(); // Assuming the input type is a string
  item = input.required<T>(); // Assuming the input type is a record with string keys and any values

  keys = computed(() => Object.keys(this.item()));
}
