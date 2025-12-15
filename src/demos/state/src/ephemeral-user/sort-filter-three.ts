import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
} from '@angular/core';
import { SortFilterStoreTwo } from './sort-filter-store-two';
type ApiProducts = [{ id: number; name: string; price: number }];
@Component({
  selector: 'app-sort-filter-three',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, TitleCasePipe],
  template: `
    <div class="prose prose-lg mb-8">
      <h2>Showing Sorting and Filtering Service State</h2>
      <p>
        All of the state here is from an HTTP request to a (mocked)
        <code>/api/products</code> resource.
      </p>
      <p>The state is stored in a service (<code>SortFilterStoreTwo</code>)</p>
      <p>The state is stored in <code>localStorage</code></p>
    </div>
    @if (products.isLoading()) {
      <p>Loading...</p>
    } @else {
      <table class="table table-auto table-zebra">
        <thead>
          <td>Id</td>
          <td>
            <button (click)="store.setSortBy('name')" class="link">
              Name

              @if (store.sortBy() === 'name') {
                <span class="text-accent">
                  @if (store.orderBy() === 'asc') {
                    ↑
                  } @else {
                    ↓
                  }
                </span>
              }
            </button>
          </td>
          <td>
            <button (click)="store.setSortBy('price')" class="link">
              Price
              @if (store.sortBy() === 'price') {
                <span class="text-accent">
                  @if (store.orderBy() === 'asc') {
                    ↑
                  } @else {
                    ↓
                  }
                </span>
              }
            </button>
          </td>
        </thead>
        <tbody>
          @for (product of productsSorted(); track product.id) {
            <tr>
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price | currency }}</td>
            </tr>
          }
        </tbody>
      </table>
      <div>
        <p>
          Sorting by: {{ store.sortBy() | titlecase }}
          @if (store.orderBy() === 'asc') {
            <span>In Ascending order.</span>
          } @else {
            <span>In Descending order.</span>
          }
        </p>
      </div>
    }
  `,
  styles: ``,
})
export class SortFilterThreeComponent {
  store = inject(SortFilterStoreTwo);

  products = resource<ApiProducts, unknown>({
    loader: () => fetch('https://some-api/products').then((res) => res.json()),
  });

  productsSorted = computed(() => {
    const sortBy = this.store.sortBy();
    const orderBy = this.store.orderBy();
    const products = this.products.value() || [];
    return products.sort((a, b) => {
      if (sortBy === 'name') {
        return orderBy === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return orderBy === 'asc' ? a.price - b.price : b.price - a.price;
      }
    });
  });
}
