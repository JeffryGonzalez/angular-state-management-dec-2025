import { Route } from '@angular/router';
import { TypedAppRouteData } from './routing';

export type AppRoute = {
  data: TypedAppRouteData;
  children?: AppRoute[];
} & Route;

export type AppRoutes = AppRoute[];
