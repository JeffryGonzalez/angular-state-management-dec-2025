import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'input[uiFormHint]',
  host: {
    '[class.app-show-required]': 'needsRequiredHint()',
  },
})
export class UiFormHintDirective {
  protected theInput = inject(ElementRef<HTMLInputElement>);
  needsRequiredHint(): boolean {
    return this.theInput.nativeElement.required && !this.theInput.nativeElement.value;
  }
}
