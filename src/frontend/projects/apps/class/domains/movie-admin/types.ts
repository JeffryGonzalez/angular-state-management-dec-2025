export const movieRatingsList = [1, 2, 3, 4, 5] as const;

export type MovieRatings = (typeof movieRatingsList)[number];

export type ApiMovie = {
  id: string;
  title: string;
  releaseDate: string;
  genre: 'comedy' | 'action' | 'drama' | 'horror' | 'sci-fi';
  rating: MovieRatings;
  director: string;
  cast: { role: string; actor: string }[];
  duration: number;
  version: number;
};
