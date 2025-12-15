import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'card-figure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <figure>
      <ng-content></ng-content>
    </figure>
  `,
  styles: ``,
})
export class CardFigure {}
