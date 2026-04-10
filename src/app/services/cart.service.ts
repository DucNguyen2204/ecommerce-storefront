import { inject, Injectable, signal } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import {
  ADD_TO_CART_MUTATION,
  CLEAR_CART_MUTATION,
  MY_CART_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_ITEM_MUTATION,
} from '../graphql/cart.operations';
import { MOCK_INITIAL_CART, MOCK_PRODUCTS } from '../mocks/mock-data';
import { Cart, CartItem } from '../models';
import { environment } from '../../environments/environment';

// Deep-clone so the mock cart is independent per service instance
function cloneCart(cart: Cart): Cart {
  return JSON.parse(JSON.stringify(cart));
}

function recalcTotal(cart: Cart): Cart {
  cart.totalAmount = cart.items.reduce((sum, i) => sum + i.subtotal, 0);
  return cart;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private apollo = inject(Apollo);
  private mockCart: Cart = cloneCart(MOCK_INITIAL_CART);

  cart = signal<Cart | null>(null);

  loadCart() {
    if (environment.useMockData) {
      this.cart.set(cloneCart(this.mockCart));
      return of(this.mockCart).pipe(tap((c) => this.cart.set(cloneCart(c))));
    }
    return this.apollo
      .watchQuery<{ myCart: Cart }>({ query: MY_CART_QUERY })
      .valueChanges.pipe(
        map((r) => r.data?.myCart as unknown as Cart),
        tap((cart) => this.cart.set(cart))
      );
  }

  addToCart(productId: string, quantity: number) {
    if (environment.useMockData) {
      const product = MOCK_PRODUCTS.find((p) => p.id === productId);
      if (product) {
        const existing = this.mockCart.items.find((i) => i.product.id === productId);
        if (existing) {
          existing.quantity += quantity;
          existing.subtotal = existing.unitPrice * existing.quantity;
        } else {
          const item: CartItem = {
            id: `ci-mock-${Date.now()}`,
            product,
            quantity,
            unitPrice: product.price,
            subtotal: product.price * quantity,
          };
          this.mockCart.items.push(item);
        }
        recalcTotal(this.mockCart);
      }
      const updated = cloneCart(this.mockCart);
      this.cart.set(updated);
      return of(updated);
    }
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
    if (environment.useMockData) {
      const item = this.mockCart.items.find((i) => i.id === cartItemId);
      if (item) {
        item.quantity = quantity;
        item.subtotal = item.unitPrice * quantity;
        recalcTotal(this.mockCart);
      }
      const updated = cloneCart(this.mockCart);
      this.cart.set(updated);
      return of(updated);
    }
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
    if (environment.useMockData) {
      this.mockCart.items = this.mockCart.items.filter((i) => i.id !== cartItemId);
      recalcTotal(this.mockCart);
      const updated = cloneCart(this.mockCart);
      this.cart.set(updated);
      return of(updated);
    }
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
    if (environment.useMockData) {
      this.mockCart = { id: this.mockCart.id, items: [], totalAmount: 0 };
      this.cart.set(null);
      return of(true);
    }
    return this.apollo
      .mutate<{ clearCart: boolean }>({
        mutation: CLEAR_CART_MUTATION,
        refetchQueries: [{ query: MY_CART_QUERY }],
      })
      .pipe(tap(() => this.cart.set(null)));
  }
}
