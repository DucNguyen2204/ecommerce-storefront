import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';

import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-header',
  imports: [MenubarModule, ButtonModule, BadgeModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  auth = inject(AuthService);
  cartService = inject(CartService);

  navItems = signal<MenuItem[]>([
    { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Shop', icon: 'pi pi-shopping-bag', routerLink: '/shop' },
  ]);

  cartCount = computed(() => {
    const cart = this.cartService.cart();
    return cart?.items.reduce((sum, i) => sum + i.quantity, 0) ?? 0;
  });

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.productService.getCategories().subscribe((categories) => {
      this.navItems.set([
        { label: 'Home', icon: 'pi pi-home', routerLink: '/' },
        { label: 'Shop', icon: 'pi pi-shopping-bag', routerLink: '/shop' },
        {
          label: 'Categories',
          icon: 'pi pi-th-large',
          items: categories.map((c) => ({
            label: c.name,
            routerLink: `/shop`,
            queryParams: { categoryId: c.id },
          })),
        },
      ]);
    });

    if (this.auth.token) {
      this.auth.loadCurrentUser().subscribe();
      this.cartService.loadCart().subscribe();
    }
  }

  logout() {
    this.auth.logout();
  }
}
