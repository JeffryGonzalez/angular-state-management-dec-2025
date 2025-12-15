import { Component } from '@angular/core';
import { ApplicationShell } from '@app-shell/application/shell';

@Component({
  selector: 'app-root',
  imports: [ApplicationShell],
  template: ` <ui-application-shell /> `,
  styles: ``,
})
export class App {}
