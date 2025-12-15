import { CurrencyPipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  resource,
  signal,
  viewChild,
  ElementRef,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-anti-patterns-pessimistic',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: `
    <!-- Open the modal using ID.showModal() method -->
    <p>Pessimistic API Interactions</p>
    <dialog #loadingModal id="my_modal_1" class="modal">
      <div class="modal-box w-3/4 h-fit">
        <h3 class="text-lg font-bold">{{ modalMessage() }}</h3>
        <img
          src="https://i0.wp.com/boingboing.net/wp-content/uploads/2015/10/tumblr_nlohpxGdBi1tlivlxo1_12801.gif?w=970"
          alt="loading"
        />
      </div>
    </dialog>

    <table class="table table-auto table-zebra">
      <thead>
        <td>Name</td>
        <td>Price</td>
        <td>Actions</td>
      </thead>
      <tbody>
        @for (product of products.value(); track product.id) {
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
export class PessimisticComponent {
  modal = viewChild<ElementRef<HTMLDialogElement>>('loadingModal');

  showModal = signal(false);
  modalMessage = signal('Loading...');
  products = resource({
    loader: () => fetch('https://some-api/products').then((res) => res.json()),
  });

  async delete(id: string) {
    this.modalMessage.set(`Deleting Product ${id}...`);
    this.showModal.set(true);
    this.modal()?.nativeElement.showModal();
    await fetch('https://some-api/products/' + id, {
      method: 'DELETE',
    });

    this.modal()?.nativeElement.close();
    this.products.reload();
  }

  constructor() {
    effect(() => {
      const isLoading = this.products.isLoading();
      if (isLoading) {
        this.modalMessage.set('Loading...');
        this.showModal.set(true);
        this.modal()?.nativeElement.showModal();
      } else {
        this.showModal.set(false);
        this.modal()?.nativeElement.close();
      }
    });
  }
}
