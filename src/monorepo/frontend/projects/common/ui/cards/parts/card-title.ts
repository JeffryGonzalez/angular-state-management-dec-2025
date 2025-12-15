import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Sizes } from '@app-ui/internal/types';

@Component({
  selector: 'card-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h2 class="card-title text-primary" [class]="sizeClass">
    <ng-content></ng-content>
  </h2>`,
  styles: ``,
})
export class CardTitle {
  size = input<Sizes>('md');

  protected get sizeClass(): string {
    switch (this.size()) {
      case 'sm':
        return 'text-lg';
      case 'md':
        return 'text-2xl';
      case 'lg':
        return 'text-3xl';
      case 'xl':
        return 'text-4xl';
      default:
        return 'text-2xl';
    }
  }
}
