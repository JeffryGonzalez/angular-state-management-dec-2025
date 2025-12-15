import { Directive, input } from '@angular/core';
import * as uiConstants from '../internal/types';

type UiButtonColor = (typeof uiConstants.colors)[number];
type UiButtonStyle = (typeof uiConstants.styles)[number];
type UiButtonBehavior = (typeof uiConstants.behaviors)[number];
type UiButtonSize = (typeof uiConstants.sizes)[number];
type UiButtonModifier = (typeof uiConstants.modifiers)[number];
@Directive({
  selector: 'button[appUiButton], a[appUiButton]',
  standalone: true,
  host: {
    '[class.btn]': 'true',
    '[class.btn-neutral]': "btnColor() === 'neutral'",
    '[class.btn-primary]': "btnColor() === 'primary'",
    '[class.btn-secondary]': "btnColor() === 'secondary'",
    '[class.btn-accent]': "btnColor() === 'accent'",
    '[class.btn-info]': "btnColor() === 'info'",
    '[class.btn-success]': "btnColor() === 'success'",
    '[class.btn-warning]': "btnColor() === 'warning'",
    '[class.btn-error]': "btnColor() === 'error'",
    '[class.btn-outline]': "btnStyle() === 'outline'",
    '[class.btn-dash]': "btnStyle() === 'dash'",
    '[class.btn-soft]': "btnStyle() === 'soft'",
    '[class.btn-ghost]': "btnStyle() === 'ghost'",
    '[class.btn-link]': "btnStyle() === 'link'",
    '[class.btn-active]': "btnBehavior() === 'active'",
    '[class.btn-disabled]': "btnBehavior() === 'disabled'",
    '[class.btn-xs]': "btnSize() === 'xs'",
    '[class.btn-sm]': "btnSize() === 'sm'",
    '[class.btn-md]': "btnSize() === 'md'",
    '[class.btn-lg]': "btnSize() === 'lg'",
    '[class.btn-xl]': "btnSize() === 'xl'",
    '[class.btn-wide]': "btnModifier() === 'wide'",
    '[class.btn-block]': "btnModifier() === 'block'",
    '[class.btn-square]': "btnModifier() === 'square'",
    '[class.btn-circle]': "btnModifier() === 'circle'",
  },
})
export class UiButtonDirective {
  btnColor = input<UiButtonColor>('neutral');
  btnStyle = input<UiButtonStyle>();
  btnBehavior = input<UiButtonBehavior>();
  btnSize = input<UiButtonSize>('md');
  btnModifier = input<UiButtonModifier>();
}
