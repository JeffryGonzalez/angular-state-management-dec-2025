import { CurrencyPipe, JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ProductsStore } from './services/products-store';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-shared-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, ReactiveFormsModule, JsonPipe],
  template: `
    @if (store.isLoading()) {
      <p>
        <span class="loading loading-bars loading-lg"></span> Getting the
        Products
      </p>
    } @else {
      <pre>Pending Changes{{ store.outbox() | json }} </pre>
      <form
        [formGroup]="form"
        (ngSubmit)="addProduct()"
        class="p-4 border-2 border-gray-400 rounded-2xl"
      >
        <div class="flex flex-row gap-2">
          <input
            formControlName="name"
            type="text"
            placeholder="Product Name"
            class="input input-bordered w-full max-w-xs"
          />
          <input
            formControlName="price"
            type="number"
            placeholder="Product Price"
            class="input input-bordered w-full max-w-xs"
          />
          <button type="submit" class="btn btn-primary btn-sm">
            Add Product
          </button>
        </div>
      </form>

      <div class="flex flex-row">
        <table class="table table-zebra w-1/2">
          <thead>
            <tr>
              <th>
                <button (click)="store.setSortKey('name')" class="link">
                  Name

                  @if (store.sortKey() === 'name') {
                    <span class="text-accent">
                      @if (store.sortOrder() === 'asc') {
                        ↑
                      } @else {
                        ↓
                      }
                    </span>
                  }
                </button>
              </th>
              <th>
                <button (click)="store.setSortKey('price')" class="link">
                  Price
                  @if (store.sortKey() === 'price') {
                    <span class="text-accent">
                      @if (store.sortOrder() === 'asc') {
                        ↑
                      } @else {
                        ↓
                      }
                    </span>
                  }
                </button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (product of store.productList().products; track product.id) {
              @let status = hasStatus(product.id);
              <tr class="m-8">
                <td>{{ product.name }} Status {{ status }}</td>
                <td>
                  {{ product.price | currency }}
                </td>
                <td>
                  @if (status !== 'stable') {
                    <span class="text-accent">Pending... {{ status }}</span>
                  } @else {
                    <span class="flex flex-row gap-2">
                      <button
                        (click)="store.deleteProduct(product)"
                        class="btn btn-warning btn-dash btn-sm"
                      >
                        Delete
                      </button>
                      <button
                        (click)="store.doublePrice(product)"
                        class="btn btn-warning btn-dash btn-sm"
                      >
                        Double Price
                      </button>
                    </span>
                  }
                </td>
              </tr>
            }
          </tbody>
        </table>

        @if (showPendingChanges()) {
          <div
            class="p-4 border-l-2 border-dashed border-gray-400 w-full bg-accent-content"
          >
            <button
              class="btn btn-primary"
              (click)="showPendingChanges.set(false)"
            >
              Hide Pending Changes
            </button>
            @if (store.hasError()) {
              <button (click)="store.clearError()" class="btn btn-error">
                Clear Error
              </button>
            }
            <div class="font-semibold">Pending Changes</div>
            <p>Status: {{ store.requestStatus() | json }}</p>

            <div class="">
              <div class="pl-4">
                <p>Deletions:</p>
                <ul class="pl-4">
                  @for (change of store.outbox()['delete']; track change.id) {
                    <li>
                      {{ change.id }} {{ change.name }} {{ change.price }}
                    </li>
                  } @empty {
                    <li class="text-sm font-light italic">
                      No deletions pending
                    </li>
                  }
                </ul>
              </div>

              <div class="pl-4">
                <p>Updates:</p>
                <ul class="pl-4">
                  @for (change of store.outbox()['update']; track change.id) {
                    <li>
                      {{ change.id }} {{ change.name }} {{ change.price }}
                    </li>
                  } @empty {
                    <li class="text-sm font-light italic">
                      No updates pending
                    </li>
                  }
                </ul>
              </div>
              <div class="pl-4">
                <p>Additions:</p>
                <ul class="pl-4">
                  @for (change of store.outbox()['add']; track change.id) {
                    <li>
                      {{ change.id }} {{ change.name }} {{ change.price }}
                    </li>
                  } @empty {
                    <li class="text-sm font-light italic">
                      No additions pending
                    </li>
                  }
                  <li>
                    <pre>{{ store.outbox() | json }} </pre>
                  </li>
                  <li></li>
                </ul>
              </div>
            </div>
          </div>
        } @else {
          <button
            class="btn btn-primary"
            (click)="showPendingChanges.set(true)"
          >
            Show Pending Changes
          </button>
        }
      </div>
    }
  `,
  styles: ``,
})
export class SharedStateComponent {
  store = inject(ProductsStore);

  showPendingChanges = signal(false);
  form = new FormGroup({
    name: new FormControl<string>(''),
    price: new FormControl<number>(0),
  });
  hasStatus(id: string) {
    if (this.store.productList().changes.deletions.includes(id))
      return 'deleting';
    if (this.store.productList().changes.updates.includes(id))
      return 'updating';
    if (this.store.productList().changes.additions.includes(id))
      return 'adding';
    return 'stable';
  }
  addProduct() {
    const newProduct = this.form.value as { name: string; price: number };
    this.store.addProduct(newProduct);
    this.form.reset();
    this.form.patchValue({ price: 0 });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
