import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { ApiMovie } from '../types';

export class MovieService {
  #client = inject(HttpClient);

  getAllMovies() {
    return this.#client.get<ApiMovie[]>('/api/movies').pipe(
      tap((movies) => console.log(`Got a movie ${movies}`)), // that magic you do with rxjs
    );
  }
}
