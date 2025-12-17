import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { movieStore } from '../stores/movie';

@Component({
  selector: 'app-movies-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [movieStore],
  imports: [FeaturePage],
  template: ` <ui-feature-page pageName="The Movies"> </ui-feature-page> `,
  styles: ``,
})
export class HomePage {}
