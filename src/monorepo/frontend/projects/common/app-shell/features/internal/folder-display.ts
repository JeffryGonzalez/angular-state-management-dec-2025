import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { LinkFolder } from './store';

@Component({
  selector: 'ui-folder-display',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, NgIcon],
  template: `
    <a
      role="tab"
      class="btn py-2 rounded-none bg-transparent"
      [routerLink]="path()"
      routerLinkActive="border-t-4 border-t-blue-500"
      (click)="clicker.emit(folder().name)"
      [class.selected-folder]="selectedFolder() === folder().name"
      [class.deselected-folder]="selectedFolder() !== folder().name"
    >
      <ng-icon class="mr-2" name="solarFolder2"></ng-icon>
      {{ text() }}
    </a>
  `,

  styles: `
    :host {
    }
  `,
})
export class FolderDisplay {
  selectedFolder = input.required<string>();
  folder = input.required<LinkFolder>();
  text = input.required<string>();
  path = input.required<string | string[] | undefined>();

  clicker = output<string>();
}
