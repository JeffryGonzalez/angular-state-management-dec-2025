import { Route } from '@angular/router';
import { TypedAppRouteData } from 'projects/common/app-shell/internal/routing';

export type AppRoute = {
  data: TypedAppRouteData;
  children?: AppRoute[];
} & Route;

export type AppRoutes = AppRoute[];
