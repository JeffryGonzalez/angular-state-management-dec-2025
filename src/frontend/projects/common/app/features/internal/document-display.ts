import { Component, ChangeDetectionStrategy, input, output, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { LinkDocument } from './store';

@Component({
  selector: 'ui-document-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, NgIcon],
  template: ` @if (showMe()) {
    <a
      role="tab"
      #rla="routerLinkActive"
      [routerLink]="child().path"
      (click)="clicker.emit(child.name)"
      routerLinkActive="border-t-4 border-t-accent"
      class="pt-2"
    >
      <ng-icon class="" name="solarDocument"></ng-icon>

      {{ text() }}
    </a>
  }`,
  styles: ``,
})
export class DocumentDisplay {
  selected = input.required<boolean>();
  child = input.required<LinkDocument>();
  parentName = input.required<string>();
  parentSelected = input.required<boolean>();
  path = input.required<string | string[] | undefined>();
  clicker = output<string>();
  text = input.required<string>();

  showMe = computed(() => {
    return this.parentSelected();
  });
}
