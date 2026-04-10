import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { CATEGORIES_QUERY, PRODUCT_QUERY, PRODUCTS_QUERY } from '../graphql/product.operations';
import {
  MOCK_CATEGORIES,
  MOCK_PRODUCTS,
  buildProductPage,
} from '../mocks/mock-data';
import { Category, Product, ProductPage } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apollo = inject(Apollo);

  getProducts(page = 0, size = 20, categoryId?: string, search?: string) {
    if (environment.useMockData) {
      return of(buildProductPage(MOCK_PRODUCTS, page, size, categoryId, search));
    }
    return this.apollo
      .watchQuery<{ products: ProductPage }>({
        query: PRODUCTS_QUERY,
        variables: { page, size, categoryId: categoryId ?? null, search: search ?? null },
      })
      .valueChanges.pipe(map((r) => r.data?.products as unknown as ProductPage));
  }

  getProduct(id: string) {
    if (environment.useMockData) {
      const product = MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0];
      return of(product);
    }
    return this.apollo
      .watchQuery<{ product: Product }>({
        query: PRODUCT_QUERY,
        variables: { id },
      })
      .valueChanges.pipe(map((r) => r.data?.product as unknown as Product));
  }

  getCategories() {
    if (environment.useMockData) {
      return of(MOCK_CATEGORIES as Category[]);
    }
    return this.apollo
      .watchQuery<{ categories: Category[] }>({ query: CATEGORIES_QUERY })
      .valueChanges.pipe(map((r) => (r.data?.categories ?? []) as unknown as Category[]));
  }
}
