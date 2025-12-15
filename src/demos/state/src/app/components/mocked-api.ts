import { JsonPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, resource } from '@angular/core';

@Component({
  selector: 'app-mocked-api',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: ` <div class="pt-8">
    @if (greeting.value()) {
      <h2 class="text-2xl font-bold">Greeting from MSW</h2>
      <p>A mocked API call to <code>/api/hello</code></p>
      <pre>{{ greeting.value() | json }}</pre>
      <button class="btn btn-primary" (click)="greeting.reload()">
        Reload
      </button>
    } @else {
      <button class="btn btn-primary" (click)="greeting.reload()">
        Load Greeting from MSW
      </button>
    }
  </div>`,
  styles: ``,
})
export class MockedApiComponent {
  greeting = resource({
    loader: () => fetch(`/api/hello`).then((response) => response.json()),
  });
}
