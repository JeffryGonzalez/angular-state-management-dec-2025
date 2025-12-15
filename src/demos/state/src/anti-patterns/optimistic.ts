import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { OptimisticStore } from './optimistic-store';

@Component({
  selector: 'app-anti-patterns-optimistic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  providers: [],
  template: `
    <!-- Open the modal using ID.showModal() method -->

    <div class="w-fit h-4">
      @if (store.mutating()) {
        <progress class="progress progress-primary w-56"></progress>
      }
    </div>
    <p>Optimistic API Interactions</p>
    <dialog #loadingModal id="my_modal_1" class="modal">
      <div class="modal-box w-3/4 h-fit">
        <h3 class="text-lg font-bold">{{ modalMessage() }}</h3>
        <img
          src="https://i0.wp.com/boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?w=970"
          alt="loading"
        />
      </div>
    </dialog>

    <div>
      @if (store.errorLog().length > 0) {
        <div class="alert alert-error">
          <div>
            <span>Errors</span>
          </div>
          <ul>
            @for (error of store.errorLog(); track $index) {
              <li>{{ error }}</li>
            }
          </ul>
        </div>
      }
    </div>
    <table class="table table-auto table-zebra">
      <thead>
        <td>Name</td>
        <td>Price</td>
        <td>Actions</td>
      </thead>
      <tbody>
        @for (product of store.entities(); track product.id) {
          <tr>
            <td>{{ product.name }}</td>
            <td>{{ product.price | currency }}</td>
            <td>
              <button class="btn btn-error" (click)="delete(product.id)">
                Delete
              </button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
  styles: ``,
})
export class OptimisticComponent {
  modal = viewChild<ElementRef<HTMLDialogElement>>('loadingModal');

  showModal = signal(false);
  modalMessage = signal('Loading...');

  store = inject(OptimisticStore);

  delete(id: string) {
    this.store.delete(id);
  }

  constructor() {
    effect(() => {
      const isLoading = this.store.loading();
      if (isLoading) {
        this.modalMessage.set('Loading...');
        this.showModal.set(true);
        this.modal()?.nativeElement.showModal();
      } else {
        this.modalMessage.set('Loaded');
        this.showModal.set(false);
        this.modal()?.nativeElement.close();
      }
    });
  }
}
