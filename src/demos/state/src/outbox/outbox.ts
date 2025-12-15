import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProductsApi } from './product-api';
import { ProductsStore } from './products-store';

@Component({
  selector: 'app-outbox2-outbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, ReactiveFormsModule],
  providers: [ProductsApi, ProductsStore],
  template: `
    <div tabindex="0" class="collapse bg-base-100 border-base-300 border">
      <div class="collapse-title font-semibold">Business "Rules"</div>
      <div class="collapse-content text-sm">
        <ul>
          <li>Product prices cannot exceed $500.00</li>
          <li>Product 5 (A Product 5) cannot be deleted</li>
        </ul>
      </div>
    </div>

    @if (store.isLoading()) {
      <div class="flex w-full flex-col gap-4">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-8 w-full"></div>
        <div class="skeleton h-8 w-full"></div>
        <div class="skeleton h-8 w-full"></div>
      </div>
    } @else {
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
      <table class="table table-auto table-zebra">
        <thead>
          <td>
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
          </td>
          <td>
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
          </td>
          <td>Actions</td>
        </thead>
        <tbody>
          @if (store.outboxAugmentedList().isAdding) {
            @for (item of store.outboxAugmentedList().additions; track $index) {
              <tr class="">
                <td>
                  <span class="">{{ item.name }}</span>
                </td>
                <td>{{ item.price | currency }}</td>
                <td>
                  <div class="z-10  ">
                    <div
                      class="flex flex-row gap-2 w-60 justify-center absolute pt-2"
                    >
                      <span class="loading loading-dots loading-lg"></span>
                      <span>Adding..</span>
                    </div>
                  </div>
                  <div class="flex flex-row gap-2 w-60 opacity-30 ">
                    <button class="btn btn-error w-1/2">Delete</button>
                    <button class="btn btn-primary w-1/2">Double Price</button>
                  </div>
                </td>
              </tr>
            }
          }
          @for (
            product of store.outboxAugmentedList().data;
            track product.item.id
          ) {
            <tr>
              @if (product.meta.isMutating) {
                <td class="italic" [class.opacity-50]="product.meta.isDeleting">
                  {{ product.meta.update?.name || product.item.name }}
                </td>
                <td class="italic" [class.opacity-50]="product.meta.isDeleting">
                  {{
                    product.meta.update?.price || product.item.price | currency
                  }}
                </td>
              } @else {
                <td>
                  @if (product.meta.errors.length > 0) {
                    <div class="indicator indicator-start">
                      <span
                        class="indicator-item status status-error animate-pulse"
                      ></span>
                      <div>
                        {{ product.item.name }}
                      </div>
                    </div>
                  } @else {
                    {{ product.item.name }}
                  }
                </td>
                <td>{{ product.item.price | currency }}</td>
              }

              <td>
                <div class="flex flex-row gap-2 w-60">
                  @if (product.meta.isDeleting) {
                    <button class="btn btn-danger btn-dash w-1/2">
                      <span class="opacity-35 absolute">Delete</span>
                      <span
                        class="loading loading-dots loading-lg z-10 absolute"
                      ></span>
                    </button>
                  } @else {
                    <button
                      class="btn btn-error w-1/2"
                      (click)="store.deleteProduct(product.item.id)"
                      [disabled]="product.meta.isMutating"
                    >
                      Delete
                    </button>
                  }
                  @if (product.meta.isUpdating) {
                    <button class="btn btn-primary btn-dash w-1/2">
                      <span class="opacity-35 absolute">Double Price</span>
                      <span
                        class="loading loading-dots loading-lg z-10 absolute"
                      ></span>
                    </button>
                  } @else {
                    <button
                      class="btn btn-primary w-1/2"
                      [disabled]="product.meta.isMutating"
                      (click)="store.doublePrice(product.item)"
                    >
                      Double Price
                    </button>
                  }
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
      @if (store.outboxAugmentedList().hasErrors) {
        <ul
          class=" mt-4 border-2 border-white-500 rounded-lg p-4 bg-accent-content"
        >
          @for (
            error of store.outboxAugmentedList().additionErrors;
            track error.id
          ) {
            <li>
              <button
                class="btn btn-circle btn-xs btn-error ml-2 inline mr-4"
                (click)="store.clearError(error.id)"
              >
                X
              </button>
              <span class="pr-4">{{ error.message }}</span>
            </li>
          }
          @for (
            error of store.outboxAugmentedList().allEntityErrors;
            track error.id
          ) {
            <li>
              <button
                aria-label="clear error"
                class="btn btn-circle btn-xs btn-error ml-2 inline mr-4"
                (click)="store.clearError(error.errorId)"
              >
                X
              </button>
              <span class="pr-4">{{ error.message }}</span>
            </li>
          }
        </ul>
      }
      <div></div>
    }
  `,
  styles: ``,
})
export class OutboxComponent {
  store = inject(ProductsStore);

  form = new FormGroup({
    name: new FormControl<string>(''),
    price: new FormControl<number>(0),
  });
  addProduct() {
    const newProduct = this.form.value as { name: string; price: number };
    this.store.addProduct(newProduct);
    this.form.reset();
    this.form.patchValue({ price: 0 });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
