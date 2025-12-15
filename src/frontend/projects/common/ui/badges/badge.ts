import { Directive, input } from '@angular/core';
import * as uiConstants from '../internal/types';
type UiSpanColor = (typeof uiConstants.colors)[number];
type UiSpanStyle = (typeof uiConstants.styles)[number];
type UiSpanSize = (typeof uiConstants.sizes)[number];
@Directive({
  selector: 'span[appUiBadge]',
  standalone: true,
  host: {
    '[class.badge]': 'true',
    '[class.badge-neutral]': "badgeColor() === 'neutral'",
    '[class.badge-primary]': "badgeColor() === 'primary'",
    '[class.badge-secondary]': "badgeColor() === 'secondary'",
    '[class.badge-accent]': "badgeColor() === 'accent'",
    '[class.badge-info]': "badgeColor() === 'info'",
    '[class.badge-success]': "badgeColor() === 'success'",
    '[class.badge-warning]': "badgeColor() === 'warning'",
    '[class.badge-error]': "badgeColor() === 'error'",
    '[class.badge-outline]': "badgeStyle() === 'outline'",
    '[class.badge-dash]': "badgeStyle() === 'dash'",
    '[class.badge-soft]': "badgeStyle() === 'soft'",
    '[class.badge-ghost]': "badgeStyle() === 'ghost'",
    '[class.badge-link]': "badgeStyle() === 'link'",

    '[class.badge-xs]': "badgeSize() === 'xs'",
    '[class.badge-sm]': "badgeSize() === 'sm'",
    '[class.badge-md]': "badgeSize() === 'md'",
    '[class.badge-lg]': "badgeSize() === 'lg'",
    '[class.badge-xl]': "badgeSize() === 'xl'",
  },
})
export class UiBadgeDirective {
  badgeColor = input<UiSpanColor>('neutral');
  badgeStyle = input<UiSpanStyle>();
  badgeSize = input<UiSpanSize>('md');
}
