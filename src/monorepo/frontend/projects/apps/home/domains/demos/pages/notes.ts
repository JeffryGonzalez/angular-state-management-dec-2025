import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { UiCardBasic } from '@app-ui/cards/card-basic';

@Component({
  selector: 'app-demos-pages-notes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, UiCardBasic],
  template: `<ui-feature-page pageName="Notes">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2  ">
      <ui-card-basic title="Class Notes" titleSize="lg" class="col-span-3">
        <p>Various notes - mostly to get you started - will be here.</p>
        <p>The notes from the class will be provided in the instructor repository.</p>
      </ui-card-basic>
      <ui-card-basic title="Scaffolding and Templates" titleSize="md" class="h-full">
        <p>For scaffolding new features, see the file in <code>/docs/scaffolding.md</code></p>
        <p>For various snippets, see the file in <code>/.vscode/typescript.code-snippets</code></p>
        <p>A big one here is for a new page component, which is <code>ngp</code></p>
      </ui-card-basic>
      <ui-card-basic title="Using the Snippet Generator" titleSize="md" class="h-full">
        <p>In the extensions recommendations, I added the snippet generator extension.</p>
        <p>
          You can highlight some text, hit the command palette, and search for "Snippet Generator:
          Create Snippet From Selection".
        </p>
        <p>This will create a snippet template for you to add to your snippets file.</p>
        <p>Be sure to adjust the prefix and description accordingly.</p>
        <p>
          It's in your clipboard after you create it, so just paste it into your snippets file, and
          edit it as desired
        </p>
        <p>
          For example, I used it to create the card snippet I use in these pages as
          <code>ngsc</code> as "inner-card".
        </p>
      </ui-card-basic>
    </div></ui-feature-page
  >`,
  styles: ``,
})
export class NotesPage {}
