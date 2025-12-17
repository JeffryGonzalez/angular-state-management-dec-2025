import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ApiMovie } from '../../../types';
import { DatePipe } from '@angular/common';
import { ListCast } from './list-cast';

@Component({
  selector: 'app-movie-list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, ListCast],
  template: `
    @let movie = movieToDisplay();
    <div class="border-b border-base-200 border-4 p-4 flex flex-row items-start justify-between">
      <div class="flex flex-col items-start justify-items-start gap-2">
        <div class="text-2xl font-black text-accent">
          {{ movie.title }}
          {{ getRatingStars(movie.rating) }}
        </div>
        <div class="text-lg uppercase font-semibold ">{{ movie.director }}, director</div>
        <div class="flex flex-row items-start gap-2">
          <div class="text-sm ">{{ movie.genre }}</div>
          <div class="text-sm ">{{ movie.duration }} min</div>

          <div class="text-sm ">
            {{ movie.releaseDate | date: 'yyyy' }}
          </div>
          <div class="flex flex-col items-end gap-2"></div>
        </div>
      </div>
      <ul class="flex flex-col items-end gap-2">
        <app-movie-list-cast-item [cast]="movie.cast" />
      </ul>
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class MovieListItem {
  movieToDisplay = input.required<ApiMovie>();
  getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
