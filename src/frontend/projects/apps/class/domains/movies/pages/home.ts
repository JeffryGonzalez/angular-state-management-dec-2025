import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FeaturePage } from '@app-shell/features/feature-page';
import { List } from './lists/list';
import { ApiMovie } from './lists/types';

@Component({
  selector: 'app-movies-pages-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FeaturePage, DatePipe, List],
  template: `
    <ui-feature-page pageName="The Movies">
      <app-movie-list [movies]="fakeMovies()"></app-movie-list>
    </ui-feature-page>
  `,
  styles: ``,
})
export class HomePage {
  fakeMovies = signal<ApiMovie[]>([
    {
      id: '1',
      title: 'Inception',
      releaseDate: '2010-07-16',
      genre: 'sci-fi',
      rating: 2,
      director: 'Christopher Nolan',
      cast: [
        { role: 'Cobb', actor: 'Leonardo DiCaprio' },
        { role: 'Arthur', actor: 'Joseph Gordon-Levitt' },
      ],
      duration: 148,
      version: 1,
    },
    {
      id: '2',
      title: 'Star Wars: Episode IV - A New Hope',
      releaseDate: '1977-05-25',
      genre: 'sci-fi',
      rating: 5,
      director: 'George Lucas',
      cast: [
        { role: 'Luke Skywalker', actor: 'Mark Hamill' },
        { role: 'Darth Vader', actor: 'David Prowse' },
        { role: 'Princess Leia', actor: 'Carrie Fisher' },
        { role: 'Han Solo', actor: 'Harrison Ford' },
      ],
      duration: 152,
      version: 1,
    },
    {
      id: '3',
      title: 'Twin Peaks: Fire Walk with Me',
      releaseDate: '1992-05-23',
      genre: 'drama',
      rating: 5,
      director: 'David Lynch',
      cast: [
        { role: 'Dale Cooper', actor: 'Kyle MacLachlan' },
        { role: 'Laura Palmer', actor: 'Sheryl Lee' },
        { role: 'Bob Billings', actor: 'Michael J. Anderson' },
      ],
      duration: 90,
      version: 1,
    },
  ]);
}
