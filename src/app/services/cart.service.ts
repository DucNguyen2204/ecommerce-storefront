import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, tap } from 'rxjs/operators';

import {
  ADD_TO_CART_MUTATION,
  CLEAR_CART_MUTATION,
  MY_CART_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_ITEM_MUTATION,
} from '../graphql/cart.operations';
import { Cart } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private apollo = inject(Apollo);

  cart = signal<Cart | null>(null);

  loadCart() {
    return this.apollo
      .watchQuery<{ myCart: Cart }>({ query: MY_CART_QUERY })
      .valueChanges.pipe(
        map((r) => r.data?.myCart as unknown as Cart),
        tap((cart) => this.cart.set(cart))
      );
  }

  addToCart(productId: string, quantity: number) {
    return this.apollo
      .mutate<{ addToCart: Cart }>({
        mutation: ADD_TO_CART_MUTATION,
        variables: { input: { productId, quantity } },
        refetchQueries: [{ query: MY_CART_QUERY }],
      })
      .pipe(
        map((r) => r.data?.addToCart as unknown as Cart),
        tap((cart) => this.cart.set(cart))
      );
  }

  updateCartItem(cartItemId: string, quantity: number) {
    return this.apollo
      .mutate<{ updateCartItem: Cart }>({
        mutation: UPDATE_CART_ITEM_MUTATION,
        variables: { input: { cartItemId, quantity } },
        refetchQueries: [{ query: MY_CART_QUERY }],
      })
      .pipe(
        map((r) => r.data?.updateCartItem as unknown as Cart),
        tap((cart) => this.cart.set(cart))
      );
  }

  removeFromCart(cartItemId: string) {
    return this.apollo
      .mutate<{ removeFromCart: Cart }>({
        mutation: REMOVE_FROM_CART_MUTATION,
        variables: { cartItemId },
        refetchQueries: [{ query: MY_CART_QUERY }],
      })
      .pipe(
        map((r) => r.data?.removeFromCart as unknown as Cart),
        tap((cart) => this.cart.set(cart))
      );
  }

  clearCart() {
    return this.apollo
      .mutate<{ clearCart: boolean }>({
        mutation: CLEAR_CART_MUTATION,
        refetchQueries: [{ query: MY_CART_QUERY }],
      })
      .pipe(tap(() => this.cart.set(null)));
  }
}
