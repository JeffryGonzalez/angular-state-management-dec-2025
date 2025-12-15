import { Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';
import { HotkeysService, HotkeysShortcutPipe } from '@ngneat/hotkeys';
@Component({
  imports: [HotkeysShortcutPipe],
  templateUrl: './help.html',
  styleUrls: [],
})
export class HelpComponent {
  ref = inject(DialogRef);
  private hotkeysService = inject(HotkeysService);

  hotkeys = this.hotkeysService.getShortcuts();
}
