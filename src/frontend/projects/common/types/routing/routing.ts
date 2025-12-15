import { IconName } from '@app-types/routing/icons';

export type TypedAppRouteData = {
  pageTitle: string;
  requiresAuth?: boolean;
  hideIfUnauthenticated?: boolean;
  linkText: string;
  requiredRoles?: string[];
  linkDescription?: string;
  iconName?: IconName;
  hide?: boolean;
};
