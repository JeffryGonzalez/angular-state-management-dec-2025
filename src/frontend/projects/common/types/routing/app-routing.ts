import { Route } from '@angular/router';
import { TypedAppRouteData } from '@app-types/routing/routing';

export type AppRoute = {
  data: TypedAppRouteData;
  children?: AppRoute[];
} & Route;

export type AppRoutes = AppRoute[];
