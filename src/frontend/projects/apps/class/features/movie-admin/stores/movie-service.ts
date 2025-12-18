import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { MovieDetailsResponse } from '@class-common/movies/types/api';
import { tap } from 'rxjs';

export class MovieService {
  #client = inject(HttpClient);

  getAllMovies() {
    return this.#client.get<MovieDetailsResponse[]>('/api/movies').pipe(
      tap((movies) => console.log(`Got a movie ${movies}`)), // that magic you do with rxjs
    );
  }
}
