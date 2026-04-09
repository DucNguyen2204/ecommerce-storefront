import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DecimalPipe, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';

import { Category, Product, ProductPage } from '../../models';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-shop',
  imports: [
    RouterLink,
    FormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    PaginatorModule,
    SelectModule,
    SkeletonModule,
    DecimalPipe,
  ],
  templateUrl: './shop.html',
})
export class Shop implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private platformId = inject(PLATFORM_ID);

  page = signal<ProductPage | null>(null);
  categories = signal<Category[]>([]);
  loading = signal(true);
  addingToCart = signal<string | null>(null);

  selectedCategory: Category | null = null;
  search = '';
  currentPage = 0;
  pageSize = 12;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.productService.getCategories().subscribe((cats) => this.categories.set(cats));
    this.loadProducts();
  }

  loadProducts() {
    this.loading.set(true);
    this.productService
      .getProducts(this.currentPage, this.pageSize, this.selectedCategory?.id, this.search || undefined)
      .subscribe({
        next: (p) => {
          this.page.set(p);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onCategoryChange() {
    this.currentPage = 0;
    this.loadProducts();
  }

  onSearch() {
    this.currentPage = 0;
    this.loadProducts();
  }

  onPageChange(event: PaginatorState) {
    this.currentPage = event.page ?? 0;
    this.loadProducts();
  }

  addToCart(product: Product) {
    this.addingToCart.set(product.id);
    this.cartService.addToCart(product.id, 1).subscribe({
      next: () => this.addingToCart.set(null),
      error: () => this.addingToCart.set(null),
    });
  }

  skeletons = Array(12).fill(null);
}
