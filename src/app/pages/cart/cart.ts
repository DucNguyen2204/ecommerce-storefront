import { Component, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../../models';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, FormsModule, DecimalPipe, ButtonModule, SkeletonModule, TableModule, InputNumberModule, TooltipModule],
  templateUrl: './cart.html',
})
export class CartPage implements OnInit {
  cartService = inject(CartService);
  private router = inject(Router);

  loading = signal(true);

  ngOnInit() {
    this.cartService.loadCart().subscribe(() => this.loading.set(false));
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity < 1) return;
    this.cartService.updateCartItem(item.id, quantity).subscribe();
  }

  remove(item: CartItem) {
    this.cartService.removeFromCart(item.id).subscribe();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
