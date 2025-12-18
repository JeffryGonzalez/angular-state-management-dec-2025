import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';
import { FeatureChildRoute } from '../../../types/routing/feature-routing';
import { DocumentDisplay } from './document-display';
import { FolderDisplay } from './folder-display';
import { sectionStore } from './store';
import { ThemePicker } from './theme-picker';
import { Authentication } from '@ht/auth/authentication';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-section-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FolderDisplay, DocumentDisplay, ThemePicker, NgIcon],
  templateUrl: './section-nav.html',
  styles: ``,
}) //
export class SectionNav {
  selectedFolder = signal('Home');
  title = input.required<string>();
  authentication = inject(Authentication);

  selectedDocument = signal('');

  setSelectedFolder(folderName: string) {
    this.selectedFolder.set(folderName);
    this.selectedDocument.set('');
  }
  protected store = inject(sectionStore);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  /**
   * This is used to hide the whole thing if there is just one "home" document.
   */
  hasEnoughToShowThis = computed(() => {
    return this.store.getFolders().length >= 1;
  });

  mutex = signal(false);
  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        if (this.mutex()) {
          return;
        }

        this.mutex.set(true);

        this.store.setCurrent(this.activatedRoute.routeConfig as unknown as FeatureChildRoute);
      });
  }
}
