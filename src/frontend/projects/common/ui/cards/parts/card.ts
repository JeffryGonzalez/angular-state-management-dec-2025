import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="card" [class.card-side]="hasSideImage()">
      <ng-content></ng-content>
    </div>
  `,
  styles: ``,
})
export class Card {
  hasSideImage = input(false, { transform: booleanAttribute });
}
