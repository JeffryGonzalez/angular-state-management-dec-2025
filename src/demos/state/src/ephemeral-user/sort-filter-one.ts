import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  resource,
  signal,
  computed,
} from '@angular/core';
type ApiProducts = [{ id: number; name: string; price: number }];
@Component({
  selector: 'app-sort-filter-one',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, TitleCasePipe],
  template: `
    <div class="prose prose-lg">
      <h2>Showing Sorting and Filtering With Component State</h2>
      <p>
        All of the state here is from an HTTP request to a (mocked)
        <code>/api/products</code> resource.
      </p>
      @if (products.isLoading()) {
        <p>Loading...</p>
      } @else {
        <table class="table table-auto table-zebra">
          <thead>
            <td>Id</td>
            <td>
              <button (click)="setSortBy('name')" class="link">
                Name

                @if (sortby() === 'name') {
                  <span class="text-accent">
                    @if (orderBy() === 'asc') {
                      ↑
                    } @else {
                      ↓
                    }
                  </span>
                }
              </button>
            </td>
            <td>
              <button (click)="setSortBy('price')" class="link">
                Price
                @if (sortby() === 'price') {
                  <span class="text-accent">
                    @if (orderBy() === 'asc') {
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
            Sorting by: {{ sortby() | titlecase }}
            @if (orderBy() === 'asc') {
              <span>In Ascending order.</span>
            } @else {
              <span>In Descending order.</span>
            }
          </p>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export class SortFilterOneComponent {
  sortby = signal<'name' | 'price'>('name');
  orderBy = signal<'asc' | 'desc'>('asc');
  products = resource<ApiProducts, unknown>({
    loader: () => fetch('https://some-api/products').then((res) => res.json()),
  });

  setSortBy(sortBy: 'name' | 'price') {
    this.sortby.set(sortBy);
    if (this.orderBy() === 'asc') {
      this.orderBy.set('desc');
    } else {
      this.orderBy.set('asc');
    }
  }

  productsSorted = computed(() => {
    const sortBy = this.sortby();
    const orderBy = this.orderBy();
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
