import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
import { MovieRatings } from '../../../types';
import { form, required, maxLength, minLength, Field } from '@angular/forms/signals';
import { CloseAllDialogsDirective } from '@ngneat/dialog';
import { RatingInput } from './rating-input';
import { JsonPipe } from '@angular/common';
export type MovieRatingRequest = {
  movie: {
    id: string;
    version: number;
  };
  rating: MovieRatings;
  comment: string;
};
@Component({
  selector: 'app-movies-add-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CloseAllDialogsDirective, RatingInput, Field, JsonPipe],
  template: `
    <h2 class="text-2xl font-bold mb-4">Add Rating for Movie {{ movieId() }}</h2>
    <form novalidate (submit)="handleSubmit($event)">
      <div class="flex flex-col gap-4 h-fit">
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Your Rating</legend>
          <app-movie-rating-input [field]="form.rating"></app-movie-rating-input>
        </fieldset>
        <fieldset class="fieldset">
          <legend class="fieldset-legend">Your Comment</legend>
          <label class="label" for="comment">Comment:</label>
          <textarea
            [field]="form.comment"
            id="comment"
            class="textarea validator"
            rows="8"
            cols="12"
            placeholder="Tell us what you thought."
          ></textarea>
          <div class="validator-hint">{{ form.comment().errorSummary() | json }}</div>
        </fieldset>
        <button type="submit" class="btn btn-primary w-1/6" closeAllDialogs>Submit Rating</button>
      </div>
    </form>
  `,
  styles: ``,
})
export class AddRating {
  movieId = input.required<string>();
  movieVersion = input.required<number>();
  handleSubmit(event: SubmitEvent) {
    // todo
    event.preventDefault();
  }

  #default = signal<MovieRatingRequest>({
    movie: { id: '', version: 0 },
    rating: 1,
    comment: '',
  });

  form = form(this.#default, (schemaPath) => {
    required(schemaPath.comment);
    minLength(schemaPath.comment, 10);
    maxLength(schemaPath.comment, 500);
    required(schemaPath.rating);
  });
}
