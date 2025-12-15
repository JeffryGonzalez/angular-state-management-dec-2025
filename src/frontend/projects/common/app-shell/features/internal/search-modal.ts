import { Component, ElementRef, inject, output, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '@app-types/routing/app-routing';

@Component({
  selector: 'search-modal',

  template: `
    <dialog id="search-modal" class="modal" #modal>
      <div class="modal-box">
        <select class="select select-xl w-full min-w-full select-success" (change)="go($event)">
          <option disabled selected>Search...</option>
          @for (r of routes(); track $index) {
            <option value="{{ r.path }}">{{ r.data.linkText }}</option>
          }
        </select>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `,
})
export class SearchModal {
  go($event: Event) {
    const selectElement = $event.target as HTMLSelectElement;
    const selectedPath = selectElement.value;
    this.#router.navigate([selectedPath]);
    this.closeModal();
  }
  #router = inject(Router);
  protected routes = signal(this.#router.config as AppRoutes);
  protected theModal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  sideBarToggle = output<void>();
  showModal() {
    this.theModal()?.nativeElement.showModal();
  }
  closeModal() {
    this.theModal()?.nativeElement.close();
  }
}
