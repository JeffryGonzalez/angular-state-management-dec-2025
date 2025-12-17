import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { ProseBlock } from '@app-ui/prose-block';

@Component({
  selector: 'app-home-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, ProseBlock],
  template: `
    <ui-feature-page pageName="Welcome to Class">
      <p
        class="text-red-500 font-black text-3xl animate__animated animate__jackInTheBox animate__delay-1s"
      >
        The thrilling return of:
      </p>
      <ui-prose-block>
        <h2>Welcome to Angular State Management</h2>
        <p>It's been a while. A lot has changed. A lot to talk about.</p>

        <h3>What's the plan</h3>
        <p>
          We're going to cover a lot of ground. From the basics to the more advanced topics, we'll
          be diving deep into the world of Angular state management.
        </p>
        <p>
          The hardest part for me is always picking where is the best place to start, because that
          depends on where you are with Angular. It has changed a bunch, particularly in the last
          few years.
        </p>
        <ol>
          <li>Standalone and the Death of the <code>NgModule</code></li>
          <li>Signals over Observables</li>
          <ol>
            <li>Input and Output Signals</li>
            <li>Model Inputs</li>
            <li>Model Outputs</li>
          </ol>
          <li>Computed Signals</li>
          <li>Effects</li>

          <li>Zones and the end of Zone.js</li>
        </ol>
        <p><em>I need to know where you knowledge gaps are!</em></p>
      </ui-prose-block>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {}
