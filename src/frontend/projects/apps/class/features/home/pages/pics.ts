import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@ht/features/feature-page';

@Component({
  selector: 'app-home-pages-pics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="pics">
    <div class="grid grid-flow-col-dense">
      <div class="w-18 h-18 dark:bg-red-500 bg-blue-500">1</div>
      <div class="w-18 h-18 dark:bg-red-500 bg-blue-500">2</div>
      <div class="w-18 h-18 dark:bg-red-500 bg-blue-500">3</div>
    </div>
    <div class="flex flex-col gap-4 justify-center items-center">
      <div
        class="dark:hue-rotate-180 dark:invert-180 flex flex-col gap-4 justify-center items-center"
      >
        <p>
          This is with the <code>dark:hue-rotate-180</code> and <code>dark:invert-180</code> filters
          applied.
        </p>
        <img src="assets/home/pic.svg" alt="Excalidraw" />
      </div>
      <div class="hue-rotate-180 invert-180 flex flex-col gap-4">
        <p>This is with the <code>hue-rotate</code> and <code>invert</code> filters applied.</p>
        <img src="assets/home/pic.svg" alt="Excalidraw" />
      </div>
      <div class="flex flex-row gap-4 justify-center items-center bg-black p-8">
        <img src="assets/home/pic.svg" alt="Excalidraw" />
      </div>
    </div>
  </ui-feature-page>`,
  styles: ``,
})
export class PicsPage {}
