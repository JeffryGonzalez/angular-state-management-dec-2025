import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Card } from './parts/card';
import { CardBody } from './parts/card-body';
import { CardFigure } from './parts/card-figure';
import { CardTitle } from './parts/card-title';

@Component({
  selector: 'ui-card-figure-top',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, CardBody, CardTitle, CardFigure],
  template: ` <card>
    <card-figure>
      <ng-content select="[figure]"></ng-content>
    </card-figure>
    <card-body>
      <card-title>{{ title() }}</card-title>
      <ng-content></ng-content>
    </card-body>
  </card>`,
  styles: ``,
})
export class UiCardFigureTop {
  title = input.required<string>();
}
