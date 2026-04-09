import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';

import { Product } from '../../models';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, FormsModule, DecimalPipe, ButtonModule, CardModule, InputNumberModule, SkeletonModule, TagModule, MessageModule],
  templateUrl: './product-detail.html',
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private platformId = inject(PLATFORM_ID);
  auth = inject(AuthService);

  product = signal<Product | null>(null);
  loading = signal(true);
  adding = signal(false);
  added = signal(false);
  quantity = 1;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(id).subscribe({
      next: (p) => {
        this.product.set(p);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  addToCart() {
    const product = this.product();
    if (!product) return;

    this.adding.set(true);
    this.cartService.addToCart(product.id, this.quantity).subscribe({
      next: () => {
        this.adding.set(false);
        this.added.set(true);
        setTimeout(() => this.added.set(false), 2000);
      },
      error: () => this.adding.set(false),
    });
  }
}
