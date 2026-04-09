import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import { CATEGORIES_QUERY, PRODUCT_QUERY, PRODUCTS_QUERY } from '../graphql/product.operations';
import { Category, Product, ProductPage } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apollo = inject(Apollo);

  getProducts(page = 0, size = 20, categoryId?: string, search?: string) {
    return this.apollo
      .watchQuery<{ products: ProductPage }>({
        query: PRODUCTS_QUERY,
        variables: { page, size, categoryId: categoryId ?? null, search: search ?? null },
      })
      .valueChanges.pipe(map((r) => r.data?.products as unknown as ProductPage));
  }

  getProduct(id: string) {
    return this.apollo
      .watchQuery<{ product: Product }>({
        query: PRODUCT_QUERY,
        variables: { id },
      })
      .valueChanges.pipe(map((r) => r.data?.product as unknown as Product));
  }

  getCategories() {
    return this.apollo
      .watchQuery<{ categories: Category[] }>({ query: CATEGORIES_QUERY })
      .valueChanges.pipe(map((r) => (r.data?.categories ?? []) as unknown as Category[]));
  }
}
