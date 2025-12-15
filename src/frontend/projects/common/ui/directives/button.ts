/* eslint-disable @typescript-eslint/no-unused-vars */

import { computed, Directive, ElementRef, inject, input } from '@angular/core';
const colors = [
  'primary',
  'primary-content',
  'secondary',
  'secondary-content',
  'accent',
  'accent-content',
  'neutral',
  'neutral-content',
  'base-100',
  'base-200',
  'base-300',
  'base-content',
  'info',
  'info-content',
  'success',
  'success-content',
  'warning',
  'warning-content',
  'error',
  'error-content',
] as const;
type ButtonColors = (typeof colors)[number];

type ButtonStyles = 'outline' | 'ghost' | 'link' | 'solid';

@Directive({
  selector: 'button[uiButton]',
  host: {
    '[class]': 'getClasses()',
  },
  standalone: true,
})
export class Button {
  protected el = inject(ElementRef<HTMLButtonElement>);
  btnColor = input<ButtonColors>('primary');

  btnStyle = input<ButtonStyles | null>(null);

  getClasses = computed(() => {
    const classes = ['btn', `btn-${this.btnColor()}`];
    if (this.btnStyle()) {
      classes.push(`btn-${this.btnStyle()}`);
    }
    return classes.join(' ');
  });
}
