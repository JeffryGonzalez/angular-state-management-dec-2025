import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';
import { FeatureChildRoute } from '../../../types/routing/feature-routing';
import { DocumentDisplay } from './document-display';
import { FolderDisplay } from './folder-display';
import { sectionStore } from './store';

@Component({
  selector: 'app-section-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FolderDisplay, DocumentDisplay],
  templateUrl: './section-nav.html',
  styles: `
    :host {
      .selected-folder {
        animation: pulse;
        animation-duration: 1s;
        animation-delay: 1s;
      }
      .deselected-folder {
        opacity: 0.6;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  `,
}) //
export class SectionNav {
  selectedFolder = signal('Home');

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
