import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { ApiMovie } from '../../../types';

@Component({
  selector: 'app-movie-list-cast-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <ul class="flex flex-col items-end gap-2">
      @for (star of cast(); track $index) {
        <li class="text-md ">
          <span class="font-bold text-orange-400">{{ star.actor }}</span> as
          <em>{{ star.role }}</em>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class ListCast {
  cast = input.required<ApiMovie['cast']>();
}
