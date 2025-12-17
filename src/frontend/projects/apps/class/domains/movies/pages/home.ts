import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { movieStore } from '../stores/movie';
import { ProseBlock } from '@app-ui/prose-block';
import { DialogCloseDirective } from '@ngneat/dialog';

@Component({
  selector: 'app-movies-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [movieStore],
  imports: [FeaturePage, ProseBlock, DialogCloseDirective],
  template: `
    <ui-feature-page pageName="The Movies">
      <ui-prose-block>
        <h3>Welcome to the Movies Feature!</h3>
        <p>
          This feature demonstrates state management using NgRx Signals in an Angular application.
          Explore the various pages to see how movie data is fetched, displayed, and managed.
        </p>
        <p>
          This is all "read only here" - there is a separate Movie Admin feature that shows
          creating, updating, and deleting movies.
        </p>
        <p>Use the navigation to explore different movie lists and details.</p>
      </ui-prose-block>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
