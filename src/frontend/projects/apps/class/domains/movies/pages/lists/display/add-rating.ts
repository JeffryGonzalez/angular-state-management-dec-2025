import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { applyWhen, Field, form, maxLength, minLength, required } from '@angular/forms/signals';
import { CloseAllDialogsDirective } from '@ngneat/dialog';
import { MovieRatings } from '../../../types';
import { RatingInput } from './rating-input';
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
    @if (submitted() === true) {
      <p>Thanks, you rock!</p>
    } @else {
      <div class="flex flex-row justify-items-start items-start gap-8 w-full">
        <div class="flex-1">
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
              </fieldset>
              <button type="submit" class="btn btn-primary w-1/6" closeAllDialogs>
                Submit Rating
              </button>
            </div>
          </form>
        </div>
        <div class="flex-1 bg-base-300 p-4 rounded-lg">
          <pre>
Form Value:
{{ form().value() | json }}


Error Summary:
{{ form().errorSummary() | json }}


          </pre
          >
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class AddRating {
  movieId = input.required<string>();
  movieVersion = input.required<number>();
  async handleSubmit(event: SubmitEvent) {
    // todo
    event.preventDefault();

    if (this.form().valid()) {
      this.form().value().movie.id = this.movieId();
      this.form().value().movie.version = this.movieVersion();
      console.log('Submitting rating:', this.form().value());

      await fetch('/api/movies/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(this.form().value()),
      });
      this.submitted.set(true);
    } else {
      return;
    }
  }
  submitted = signal(false);

  #default = signal<MovieRatingRequest>({
    movie: { id: '', version: 0 },
    rating: 1,
    comment: '',
  });

  form = form(this.#default, (schemaPath) => {
    // when the reating is 2 or below, comment must be at least 20 characters
    // Justify your negativity!
    applyWhen(
      schemaPath.comment,
      ({ valueOf }) => valueOf(schemaPath.rating) <= 2,
      (s) => minLength(s, 20),
    );

    required(schemaPath.comment);
    minLength(schemaPath.comment, 10);

    maxLength(schemaPath.comment, 500);
    required(schemaPath.rating);
  });
}
