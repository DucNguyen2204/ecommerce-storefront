import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';

import { Product } from '../../models';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe, ButtonModule, CardModule, SkeletonModule],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private platformId = inject(PLATFORM_ID);
  auth = inject(AuthService);

  featured = signal<Product[]>([]);
  loading = signal(true);
  addingToCart = signal<string | null>(null);

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.productService.getProducts(0, 8).subscribe({
      next: (page) => {
        this.featured.set(page.content);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addToCart(product: Product) {
    this.addingToCart.set(product.id);
    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => this.addingToCart.set(null),
      error: () => this.addingToCart.set(null),
    });
  }
}
