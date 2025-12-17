import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ApiMovie } from '../../../types';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ListCast } from './list-cast';
import { MovieListItem } from './list-item';

@Component({
  selector: 'app-movies-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, ListCast, MovieListItem],
  template: `
    <ul class=" bg-base-100 rounded-box shadow-md ">
      @for (movie of movies(); track movie.id) {
        <li>
          <app-movie-list-item [movieToDisplay]="movie">
            <div class="flex flex-row items-start gap-2">
              <a class="btn btn-sm btn-secondary" [routerLink]="['.', movie.id]">Details</a>
            </div>
          </app-movie-list-item>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class MoviesList {
  movies = input.required<ApiMovie[]>();

  getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
