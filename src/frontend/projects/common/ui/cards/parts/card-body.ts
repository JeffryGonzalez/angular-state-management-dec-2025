import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'card-body',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="card-body">
    <ng-content> </ng-content>
  </div>`,
  styles: ``,
})
export class CardBody {}
