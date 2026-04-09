import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MessageModule } from 'primeng/message';

import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, FormsModule, DecimalPipe, ButtonModule, CardModule, InputTextModule, TextareaModule, MessageModule],
  templateUrl: './checkout.html',
})
export class Checkout {
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private router = inject(Router);

  cartService$ = this.cartService;
  shippingAddress = '';
  placing = signal(false);
  error = signal<string | null>(null);

  placeOrder() {
    if (!this.shippingAddress.trim()) return;

    this.placing.set(true);
    this.error.set(null);

    this.orderService.placeOrder(this.shippingAddress).subscribe({
      next: (order) => {
        this.cartService.cart.set(null);
        this.router.navigate(['/orders'], { queryParams: { newOrder: order.id } });
      },
      error: (err) => {
        this.error.set(err.message ?? 'Failed to place order. Please try again.');
        this.placing.set(false);
      },
    });
  }
}
