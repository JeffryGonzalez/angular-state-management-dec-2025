import { delay, http, HttpResponse } from 'msw';

type ApiMovie = {
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

const movies: ApiMovie[] = [
  {
    id: '1',
    title: 'The Quantum Paradox',
    releaseDate: '2024-03-15',
    genre: 'sci-fi',
    rating: 5,
    director: 'Christopher Nolan',
    cast: [
      { role: 'Dr. Sarah Chen', actor: 'Emma Stone' },
      { role: 'Agent Marcus Cole', actor: 'Idris Elba' },
    ],
    duration: 148,
    version: 7,
  },
  {
    id: '2',
    title: 'Last Laugh',
    releaseDate: '2023-06-22',
    genre: 'comedy',
    rating: 4,
    director: 'Greta Gerwig',
    cast: [
      { role: 'Tommy Sullivan', actor: 'Ryan Gosling' },
      { role: 'Lisa Martinez', actor: 'Awkwafina' },
    ],
    duration: 102,
    version: 3,
  },
  {
    id: '3',
    title: 'Midnight Runner',
    releaseDate: '2024-01-10',
    genre: 'action',
    rating: 5,
    director: 'John Wick',
    cast: [
      { role: 'Alex Hunter', actor: 'Keanu Reeves' },
      { role: 'Nina Patel', actor: 'Priyanka Chopra' },
    ],
    duration: 125,
    version: 11,
  },
  {
    id: '4',
    title: 'The Silent Echo',
    releaseDate: '2023-10-31',
    genre: 'horror',
    rating: 3,
    director: 'Jordan Peele',
    cast: [
      { role: 'Emma Richardson', actor: 'Lupita Nyongo' },
      { role: 'David Cole', actor: 'Daniel Kaluuya' },
    ],
    duration: 98,
    version: 5,
  },
  {
    id: '5',
    title: 'Broken Dreams',
    releaseDate: '2024-02-14',
    genre: 'drama',
    rating: 5,
    director: 'Denis Villeneuve',
    cast: [
      { role: 'Robert Hayes', actor: 'Joaquin Phoenix' },
      { role: 'Maria Santos', actor: 'Frances McDormand' },
    ],
    duration: 137,
    version: 13,
  },
  {
    id: '6',
    title: 'Space Pirates',
    releaseDate: '2023-07-20',
    genre: 'sci-fi',
    rating: 3,
    director: 'James Gunn',
    cast: [
      { role: 'Captain Zara', actor: 'Zoe Saldana' },
      { role: 'Finn', actor: 'Chris Pratt' },
    ],
    duration: 115,
    version: 2,
  },
  {
    id: '7',
    title: 'Wedding Crashers 2',
    releaseDate: '2023-12-01',
    genre: 'comedy',
    rating: 2,
    director: 'David Dobkin',
    cast: [
      { role: 'John Beckwith', actor: 'Owen Wilson' },
      { role: 'Jeremy Grey', actor: 'Vince Vaughn' },
    ],
    duration: 95,
    version: 8,
  },
  {
    id: '8',
    title: 'Vengeance Protocol',
    releaseDate: '2024-05-10',
    genre: 'action',
    rating: 4,
    director: 'Chad Stahelski',
    cast: [
      { role: 'Jake Morrison', actor: 'Tom Hardy' },
      { role: 'Elena Volkov', actor: 'Charlize Theron' },
    ],
    duration: 132,
    version: 12,
  },
  {
    id: '9',
    title: 'The Inheritance',
    releaseDate: '2023-11-15',
    genre: 'drama',
    rating: 4,
    director: 'Todd Field',
    cast: [
      { role: 'Margaret Winters', actor: 'Cate Blanchett' },
      { role: 'Thomas Winters', actor: 'Ralph Fiennes' },
    ],
    duration: 144,
    version: 6,
  },
  {
    id: '10',
    title: 'Nightmare House',
    releaseDate: '2024-10-27',
    genre: 'horror',
    rating: 4,
    director: 'Ari Aster',
    cast: [
      { role: 'Jessica Lane', actor: 'Florence Pugh' },
      { role: 'Dr. Michael Reed', actor: 'Oscar Isaac' },
    ],
    duration: 107,
    version: 4,
  },
  {
    id: '11',
    title: 'Summer of Love',
    releaseDate: '2023-08-18',
    genre: 'comedy',
    rating: 5,
    director: 'Nancy Meyers',
    cast: [
      { role: 'Claire Bennett', actor: 'Jennifer Lawrence' },
      { role: 'Max Turner', actor: 'Paul Rudd' },
    ],
    duration: 110,
    version: 9,
  },
  {
    id: '12',
    title: 'Mars Colony Alpha',
    releaseDate: '2024-04-05',
    genre: 'sci-fi',
    rating: 4,
    director: 'Ridley Scott',
    cast: [
      { role: 'Commander Kate Miller', actor: 'Jessica Chastain' },
      { role: 'Dr. James Park', actor: 'John Cho' },
    ],
    duration: 155,
    version: 1,
  },
  {
    id: '13',
    title: 'Speed Demon',
    releaseDate: '2023-09-08',
    genre: 'action',
    rating: 3,
    director: 'Michael Bay',
    cast: [
      { role: 'Danny Rourke', actor: 'Mark Wahlberg' },
      { role: 'Sofia Reyes', actor: 'Ana de Armas' },
    ],
    duration: 118,
    version: 10,
  },
  {
    id: '14',
    title: 'The Last Letter',
    releaseDate: '2024-01-26',
    genre: 'drama',
    rating: 5,
    director: 'Damien Chazelle',
    cast: [
      { role: 'Henry Walsh', actor: 'Andrew Garfield' },
      { role: 'Rebecca Shaw', actor: 'Saoirse Ronan' },
    ],
    duration: 128,
    version: 5,
  },
  {
    id: '15',
    title: 'The Basement',
    releaseDate: '2023-10-13',
    genre: 'horror',
    rating: 2,
    director: 'Mike Flanagan',
    cast: [
      { role: 'Sarah Miller', actor: 'Carla Gugino' },
      { role: 'Tom Miller', actor: 'Henry Thomas' },
    ],
    duration: 91,
    version: 13,
  },
  {
    id: '16',
    title: 'Office Wars',
    releaseDate: '2024-03-29',
    genre: 'comedy',
    rating: 4,
    director: 'Judd Apatow',
    cast: [
      { role: 'Mike Stevens', actor: 'Seth Rogen' },
      { role: 'Amanda Ross', actor: 'Kristen Wiig' },
    ],
    duration: 105,
    version: 3,
  },
  {
    id: '17',
    title: 'Black Ops: Retaliation',
    releaseDate: '2023-11-24',
    genre: 'action',
    rating: 4,
    director: 'Antoine Fuqua',
    cast: [
      { role: 'Colonel Jack Ryan', actor: 'Denzel Washington' },
      { role: 'Lieutenant Maya Singh', actor: 'Tessa Thompson' },
    ],
    duration: 140,
    version: 8,
  },
  {
    id: '18',
    title: 'Echoes of Tomorrow',
    releaseDate: '2024-06-14',
    genre: 'sci-fi',
    rating: 5,
    director: 'Alex Garland',
    cast: [
      { role: 'Dr. Ava Chen', actor: 'Natalie Portman' },
      { role: 'Marcus Webb', actor: 'Michael B. Jordan' },
    ],
    duration: 142,
    version: 11,
  },
  {
    id: '19',
    title: 'Family Reunion',
    releaseDate: '2023-12-22',
    genre: 'drama',
    rating: 3,
    director: 'Kenneth Lonergan',
    cast: [
      { role: 'John Henderson', actor: 'Casey Affleck' },
      { role: 'Mary Henderson', actor: 'Michelle Williams' },
    ],
    duration: 120,
    version: 7,
  },
  {
    id: '20',
    title: 'The Witch of Willow Creek',
    releaseDate: '2024-10-18',
    genre: 'horror',
    rating: 5,
    director: 'Robert Eggers',
    cast: [
      { role: 'Elizabeth Stone', actor: 'Anya Taylor-Joy' },
      { role: 'Father Matthew', actor: 'Willem Dafoe' },
    ],
    duration: 113,
    version: 2,
  },
];

export const movieHandlers = [
  http.get('/api/movies', async () => {
    await delay();
    return HttpResponse.json(movies);
  }),
  http.get('/api/movies/:id', async ({ params }) => {
    await delay();
    const movie = movies.find((movie) => movie.id === params['id']);
    if (!movie) {
      return new HttpResponse('Movie not found', { status: 404 });
    }
    return HttpResponse.json(movie);
  }),
];
