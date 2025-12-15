import { IconName } from '../application/icons';

export type TypedAppRouteData = {
  pageTitle: string;
  requiresAuth?: boolean;
  hideIfUnauthenticated?: boolean;
  linkText: string;
  requiredRoles?: string[];
  linkDescription?: string;
  iconName?: IconName;
};
