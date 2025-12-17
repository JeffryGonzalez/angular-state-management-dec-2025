import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeaturePage } from '@app-shell/features/feature-page';
import { ApiMovie } from '../../types';
import { map } from 'rxjs';
import { MoviesList } from './display/list';

@Component({
  selector: 'app-movies-pages-list-with-httpclient',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, MoviesList],
  template: `<ui-feature-page pageName="Same List With HttpClient">
    <app-movies-list [movies]="moviesWithHttpClient()"></app-movies-list>
  </ui-feature-page>`,
  styles: ``,
})
export class ListWithHttpClientPage {
  #httpClient = inject(HttpClient);

  moviesWithHttpClient = toSignal(
    this.#httpClient
      .get<ApiMovie[]>('/api/movies')
      .pipe(map((movies) => movies.sort((a, b) => a.title.localeCompare(b.title)))),
    {
      initialValue: [],
    },
  );
}
