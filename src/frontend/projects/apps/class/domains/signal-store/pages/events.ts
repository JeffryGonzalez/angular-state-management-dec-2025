import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';

@Component({
  selector: 'app-signals-pages-events',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage],
  template: `<ui-feature-page pageName="Signal Store Events">
    <ul>
      <li>Just more Features</li>
      <li>Events and Event Groups</li>
      <li>Reducers</li>
      <li>Effects</li>
      <li>Dispatcher (<code>injectDispatch</code>)</li>
    </ul>
  </ui-feature-page>`,
  styles: ``,
})
export class EventsPage {}
