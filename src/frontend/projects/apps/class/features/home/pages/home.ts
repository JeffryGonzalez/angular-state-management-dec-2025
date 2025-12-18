import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@ht/features/feature-page';
import { ProseBlock } from '@ht/ui/prose-block';

@Component({
  selector: 'app-home-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, ProseBlock],
  template: `
    <ui-feature-page pageName="Hypertheory Training">
      <div class="flex flex-row gap-4">
        <div class="bg-base-100 h-32 w-1/3 border-2 border-neutral p-4">
          <p class="font-bold">Base 100</p>
          <p>Used for blank backgrounds</p>
        </div>

        <div class="bg-base-200 hh-32 w-1/3 border-2 border-neutral p-4">
          <p class="font-bold">Base 200</p>
          <p>Give a little more depth</p>
        </div>
        <div class="bg-base-300 h-32 w-1/3 border-2 border-neutral p-4">
          <p class="font-bold">Base 300</p>
          <p>Even more depth</p>
        </div>
      </div>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
