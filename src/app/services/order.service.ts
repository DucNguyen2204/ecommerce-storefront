import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CANCEL_ORDER_MUTATION,
  MY_ORDERS_QUERY,
  ORDER_QUERY,
  PLACE_ORDER_MUTATION,
} from '../graphql/order.operations';
import { MOCK_ORDERS, MOCK_USER } from '../mocks/mock-data';
import { Order, OrderItem } from '../models';
import { environment } from '../../environments/environment';
import { CartService } from './cart.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apollo = inject(Apollo);
  private cartService = inject(CartService);
  private mockOrders: Order[] = JSON.parse(JSON.stringify(MOCK_ORDERS));

  getMyOrders() {
    if (environment.useMockData) {
      return of([...this.mockOrders]);
    }
    return this.apollo
      .watchQuery<{ myOrders: Order[] }>({ query: MY_ORDERS_QUERY })
      .valueChanges.pipe(map((r) => (r.data?.myOrders ?? []) as unknown as Order[]));
  }

  getOrder(id: string) {
    if (environment.useMockData) {
      const order = this.mockOrders.find((o) => o.id === id) ?? this.mockOrders[0];
      return of(order);
    }
    return this.apollo
      .watchQuery<{ order: Order }>({ query: ORDER_QUERY, variables: { id } })
      .valueChanges.pipe(map((r) => r.data?.order as unknown as Order));
  }

  placeOrder(shippingAddress: string) {
    if (environment.useMockData) {
      const cart = this.cartService.cart();
      const orderItems: OrderItem[] = (cart?.items ?? []).map((ci) => ({
        id: `oi-mock-${ci.id}`,
        product: ci.product,
        quantity: ci.quantity,
        unitPrice: ci.unitPrice,
        subtotal: ci.subtotal,
      }));
      const newOrder: Order = {
        id: `order-mock-${Date.now()}`,
        user: MOCK_USER,
        items: orderItems,
        totalAmount: cart?.totalAmount ?? 0,
        status: 'PENDING',
        shippingAddress,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.mockOrders.unshift(newOrder);
      return of(newOrder);
    }
    return this.apollo
      .mutate<{ placeOrder: Order }>({
        mutation: PLACE_ORDER_MUTATION,
        variables: { input: { shippingAddress } },
        refetchQueries: [{ query: MY_ORDERS_QUERY }],
      })
      .pipe(map((r) => r.data?.placeOrder as unknown as Order));
  }

  cancelOrder(orderId: string) {
    if (environment.useMockData) {
      const order = this.mockOrders.find((o) => o.id === orderId);
      if (order) {
        order.status = 'CANCELLED';
        order.updatedAt = new Date().toISOString();
      }
      return of(order as Order);
    }
    return this.apollo
      .mutate<{ cancelOrder: Order }>({
        mutation: CANCEL_ORDER_MUTATION,
        variables: { orderId },
        refetchQueries: [{ query: MY_ORDERS_QUERY }],
      })
      .pipe(map((r) => r.data?.cancelOrder as unknown as Order));
  }
}
