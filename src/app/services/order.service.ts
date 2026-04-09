import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import {
  CANCEL_ORDER_MUTATION,
  MY_ORDERS_QUERY,
  ORDER_QUERY,
  PLACE_ORDER_MUTATION,
} from '../graphql/order.operations';
import { Order } from '../models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apollo = inject(Apollo);

  getMyOrders() {
    return this.apollo
      .watchQuery<{ myOrders: Order[] }>({ query: MY_ORDERS_QUERY })
      .valueChanges.pipe(map((r) => (r.data?.myOrders ?? []) as unknown as Order[]));
  }

  getOrder(id: string) {
    return this.apollo
      .watchQuery<{ order: Order }>({ query: ORDER_QUERY, variables: { id } })
      .valueChanges.pipe(map((r) => r.data?.order as unknown as Order));
  }

  placeOrder(shippingAddress: string) {
    return this.apollo
      .mutate<{ placeOrder: Order }>({
        mutation: PLACE_ORDER_MUTATION,
        variables: { input: { shippingAddress } },
        refetchQueries: [{ query: MY_ORDERS_QUERY }],
      })
      .pipe(map((r) => r.data?.placeOrder as unknown as Order));
  }

  cancelOrder(orderId: string) {
    return this.apollo
      .mutate<{ cancelOrder: Order }>({
        mutation: CANCEL_ORDER_MUTATION,
        variables: { orderId },
        refetchQueries: [{ query: MY_ORDERS_QUERY }],
      })
      .pipe(map((r) => r.data?.cancelOrder as unknown as Order));
  }
}
