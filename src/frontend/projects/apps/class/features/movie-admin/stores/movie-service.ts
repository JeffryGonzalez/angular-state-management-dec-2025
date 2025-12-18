import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { MovieDetailsResponseModel } from '../../../common/external/movies-api';

import { tap } from 'rxjs';

export class MovieService {
  #client = inject(HttpClient);

  getAllMovies() {
    return this.#client.get<MovieDetailsResponseModel[]>('/api/movies').pipe(
      tap((movies) => console.log(`Got a movie ${movies}`)), // that magic you do with rxjs
    );
  }
}
