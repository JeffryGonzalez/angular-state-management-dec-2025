import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Card } from './parts/card';
import { CardBody } from './parts/card-body';
import { CardFigure } from './parts/card-figure';
import { CardTitle } from './parts/card-title';

@Component({
  selector: 'ui-card-figure-bottom',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, CardBody, CardTitle, CardFigure],
  template: ` <card>
    <card-body>
      <card-title>{{ title() }}</card-title>
      <ng-content></ng-content>
    </card-body>
    <card-figure>
      <ng-content select="[figure]"></ng-content>
    </card-figure>
  </card>`,
  styles: ``,
})
export class UiCardFigureBottom {
  title = input.required<string>();
}
