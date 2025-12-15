import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { ProseBlock } from '@app-ui/prose-block';

@Component({
  selector: 'app-home-pages-classes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, ProseBlock],
  template: `<ui-feature-page pageName="Hypertheory Classes">
    <ui-prose-block>
      <h2>Hypertheory Training Classes</h2>
      <p>The Angular Related Ones</p>

      <h3>Intro to Angular</h3>
      <p><em>Coming in Q2 2024</em></p>
      <h3>Applied Angular</h3>
      <p>Beginning state management, communication, services, APIs.</p>
      <p>A lot about structuring an application and working as a team.</p>
      <p>4 days, with labs.</p>
      <p>
        Check out
        <a href="https://applied-angular.hypertheory.com/" target="_blank"
          >https://applied-angular.hypertheory.com/</a
        >
      </p>

      <h3>TypeScript for Angular Developers</h3>
      <p>Learn TypeScript, the language that powers Angular.</p>
      <p>3 days</p>
      <p>
        Check out
        <a href="https://typescript.hypertheory.com/" target="_blank"
          >https://typescript.hypertheory.com/</a
        >
      </p>
    </ui-prose-block>
  </ui-feature-page>`,
  styles: ``,
})
export class ClassesPage {}
