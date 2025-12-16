import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ApiMovie } from './types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  template: `
    <ul class=" bg-base-100 rounded-box shadow-md ">
      @for (movie of movies(); track movie.id) {
        <li
          class=" border-b border-base-200 border-4 p-4 flex flex-row items-start justify-between"
        >
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
            </div>
          </div>
          <div class="flex flex-col items-end gap-2">
            <ul class="flex flex-col items-end gap-2">
              @for (star of movie.cast; track $index) {
                <li class="text-md ">
                  <span class="font-bold">{{ star.actor }}</span> as
                  <em>{{ star.role }}</em>
                </li>
              }
            </ul>
            <div class="flex flex-row items-start gap-2"></div>
          </div>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class List {
  movies = input.required<ApiMovie[]>();

  getRatingStars(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
