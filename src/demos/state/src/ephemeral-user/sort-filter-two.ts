import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  resource,
} from '@angular/core';
import { SortFilterStore } from './sort-filter-store';
type ApiProducts = [{ id: number; name: string; price: number }];
@Component({
  selector: 'app-sort-filter-two',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, TitleCasePipe],
  template: `
    <div class="prose prose-lg">
      <h2>Showing Sorting and Filtering Service State</h2>
      <p>
        All of the state here is from an HTTP request to a (mocked)
        <code>/api/products</code> resource.
      </p>
      <p>The state is stored in a service (<code>SortFilterStore</code>)</p>
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
export class SortFilterTwoComponent {
  store = inject(SortFilterStore); // [!code highlight]

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
