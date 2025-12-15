import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export type ApiProduct = { id: string; name: string; price: number };

export class ProductsApi {
  #client = inject(HttpClient);
  getProducts() {
    return this.#client.get<ApiProduct[]>('https://some-api/products');
  }

  deleteProduct(id: string) {
    return this.#client.delete(`https://some-api/products/${id}`);
  }
  addProduct(product: Omit<ApiProduct, 'id'>) {
    return this.#client.post<ApiProduct>('https://some-api/products', product);
  }
  updateProduct(product: ApiProduct) {
    return this.#client.put<ApiProduct>(
      `https://some-api/products/${product.id}`,
      product,
    );
  }
}
