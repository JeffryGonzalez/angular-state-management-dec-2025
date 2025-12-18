import { Component, signal } from '@angular/core';
import { ApplicationShell } from '@ht/app/application/application/shell';

@Component({
  selector: 'app-root',
  imports: [ApplicationShell],
  template: ` <ui-application-shell /> `,
  styles: ``,
})
export class App {
  protected readonly title = signal('class');
}
