import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { DevInfo } from '@app-ui/dev-info';
import { bigMovieStore } from '../stores/movie-big';

@Component({
  selector: 'app-movies-pages-page-big',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [bigMovieStore], // this means this will live as long as this component
  imports: [FeaturePage, DevInfo],
  template: `<ui-feature-page pageName="page-big">
    <ui-dev-info [obj]="store.entities()"></ui-dev-info>
  </ui-feature-page>`,
  styles: ``,
})
export class MovieListTwoPage {
  store = inject(bigMovieStore);
}
