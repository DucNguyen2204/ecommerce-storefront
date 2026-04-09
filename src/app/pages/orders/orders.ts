import { Component, inject, OnInit, signal } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { Order, OrderStatus } from '../../models';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, DatePipe, DecimalPipe, ButtonModule, CardModule, SkeletonModule, TableModule, TagModule],
  templateUrl: './orders.html',
})
export class Orders implements OnInit {
  private orderService = inject(OrderService);

  orders = signal<Order[]>([]);
  loading = signal(true);
  cancelling = signal<string | null>(null);

  ngOnInit() {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  cancelOrder(order: Order) {
    this.cancelling.set(order.id);
    this.orderService.cancelOrder(order.id).subscribe({
      next: (updated) => {
        this.orders.update((list) => list.map((o) => (o.id === updated.id ? updated : o)));
        this.cancelling.set(null);
      },
      error: () => this.cancelling.set(null),
    });
  }

  statusSeverity(status: OrderStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' {
    const map: Record<OrderStatus, 'success' | 'info' | 'warn' | 'danger' | 'secondary'> = {
      PENDING: 'warn',
      CONFIRMED: 'info',
      SHIPPED: 'info',
      DELIVERED: 'success',
      CANCELLED: 'danger',
    };
    return map[status];
  }
}
