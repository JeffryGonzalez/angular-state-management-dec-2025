import { Component, ChangeDetectionStrategy, VERSION } from '@angular/core';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="prose">
      <h2>State Management Demos (using Angular {{ version }})</h2>
      <p>
        This is a demo application showcasing different state management
        techniques in Angular. The goal is to provide a clear and concise
        comparison of various approaches.
      </p>
    </div>
  `,
  styles: ``,
})
export class HomeComponent {
  version = VERSION.full;
}
