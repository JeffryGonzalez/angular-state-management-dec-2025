import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { ProseBlock } from '@app-ui/prose-block';

@Component({
  selector: 'app-home-pages-greeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, ProseBlock],
  template: `
    <ui-feature-page pageName="Angular State Management">
      <ui-prose-block>
        <h2>About this Course and This Site</h2>
        <p>
          This site is a collection of examples and resources for learning about state management in
          Angular.
        </p>
        <p>
          The course is designed to help you understand the basics of state management in Angular,
          including how to use services, observables, and NgRx to manage application state.
        </p>
      </ui-prose-block>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
