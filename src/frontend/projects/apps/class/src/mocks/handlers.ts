import { HttpHandler } from 'msw';
import { bffHandlers } from './bff/handlers';
import { movieHandlers } from './demos/moviesHandler';
export const handlers: HttpHandler[] = [...bffHandlers, ...movieHandlers];
