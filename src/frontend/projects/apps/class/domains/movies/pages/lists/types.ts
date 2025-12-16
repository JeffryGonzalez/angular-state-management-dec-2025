export type ApiMovie = {
  id: string;
  title: string;
  releaseDate: string;
  genre: 'comedy' | 'action' | 'drama' | 'horror' | 'sci-fi';
  rating: 1 | 2 | 3 | 4 | 5;
  director: string;
  cast: { role: string; actor: string }[];
  duration: number;
  version: number;
};
