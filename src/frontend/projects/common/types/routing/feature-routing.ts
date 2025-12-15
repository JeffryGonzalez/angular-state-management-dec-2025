import { Route } from '@angular/router';
import { TypedAppRouteData } from '@app-types/routing/routing';

type TypedFeatureData = Omit<TypedAppRouteData, 'linkDescription' | 'iconName' | 'pageTitle'>;

export type FeatureChildRoute = {
  data: TypedFeatureData;
  children: FeatureChildRoute[];
} & Route;

export type FeatureRoute = {
  children?: FeatureChildRoute[];
} & Route;

export type FeatureRoutes = [FeatureRoute];
