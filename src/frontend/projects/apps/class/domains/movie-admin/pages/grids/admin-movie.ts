import { Component, ChangeDetectionStrategy, inject, viewChild } from '@angular/core';
import { movieAdminStore } from '../../stores/movie-big';
import { DatePipe } from '@angular/common';
import { Edit } from './edit';

@Component({
  selector: 'app-movie-admin-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, Edit],
  template: `
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>
              <button
                class="btn btn-ghost"
                [class.underline]="store.sortingBy() === 'title'"
                (click)="store.setSortBy('title')"
              >
                Title
                @if (store.sortingBy() === 'title') {
                  @if (store.sortDirection() === 'asc') {
                    ▲
                  } @else {
                    ▼
                  }
                }
              </button>
            </th>
            <th>
              <button
                [class.underline]="store.sortingBy() === 'director'"
                class="btn btn-ghost"
                (click)="store.setSortBy('director')"
              >
                Director
                @if (store.sortingBy() === 'director') {
                  @if (store.sortDirection() === 'asc') {
                    ▲
                  } @else {
                    ▼
                  }
                }
              </button>
            </th>
            <th>
              <button
                [class.underline]="store.sortingBy() === 'releaseDate'"
                class="btn btn-ghost"
                (click)="store.setSortBy('releaseDate')"
              >
                Release Date
                @if (store.sortingBy() === 'releaseDate') {
                  @if (store.sortDirection() === 'asc') {
                    ▲
                  } @else {
                    ▼
                  }
                }
              </button>
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          @for (movie of store.movies(); track movie.id) {
            <tr class="odd:bg-base-300 ">
              <th class="opacity-50">{{ movie.id }}</th>
              <td>{{ movie.title }}</td>
              <td>{{ movie.director }}</td>
              <td>{{ movie.releaseDate | date }}</td>
              <td class=" h-20   items-center justify-items-center w-fit flex flex-row">
                <div class="flex flex-row gap-2">
                  <button (click)="edit(movie.id)" class="btn btn-xs btn-primary">Edit</button>
                  <button class="btn btn-xs btn-error">Delete</button>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
    <app-movie-edit #editModal />
  `,
  styles: ``,
})
export class AdminMovieGrid {
  protected store = inject(movieAdminStore);
  editModal = viewChild<Edit>(Edit);
  modal = viewChild.required<Edit>('editModal');

  edit(movieId: string) {
    console.log('Editing movie with id:', movieId);
    this.modal().open();
  }
}
