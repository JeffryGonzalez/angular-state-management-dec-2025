import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Card } from './parts/card';
import { CardBody } from './parts/card-body';
import { CardTitle } from './parts/card-title';
import { Sizes } from '@app-ui/internal/types';

@Component({
  selector: 'ui-card-basic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, CardBody, CardTitle],
  template: ` <card>
    <card-body class="bg-base-content/10">
      <card-title [size]="titleSize()">{{ title() }}</card-title>
      <ng-content class="prose prose-xl"></ng-content>
    </card-body>
  </card>`,
  styles: ``,
})
export class UiCardBasic {
  title = input.required<string>();
  titleSize = input<Sizes>('lg');
}
