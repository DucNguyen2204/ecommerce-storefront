import { inject, Injectable, PLATFORM_ID, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { map, tap } from 'rxjs/operators';

import { LOGIN_MUTATION, ME_QUERY, REGISTER_MUTATION } from '../graphql/auth.operations';
import { AuthPayload, User } from '../models';

const TOKEN_KEY = 'jwt_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apollo = inject(Apollo);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  currentUser = signal<User | null>(null);
  isAuthenticated = computed(() => this.currentUser() !== null);

  get token(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(TOKEN_KEY);
  }

  login(email: string, password: string) {
    return this.apollo
      .mutate<{ login: AuthPayload }>({
        mutation: LOGIN_MUTATION,
        variables: { input: { email, password } },
      })
      .pipe(
        map((r) => r.data!.login),
        tap((payload) => this.setSession(payload))
      );
  }

  register(email: string, password: string, firstName: string, lastName: string) {
    return this.apollo
      .mutate<{ register: AuthPayload }>({
        mutation: REGISTER_MUTATION,
        variables: { input: { email, password, firstName, lastName } },
      })
      .pipe(
        map((r) => r.data!.register),
        tap((payload) => this.setSession(payload))
      );
  }

  loadCurrentUser() {
    return this.apollo
      .query<{ me: User }>({ query: ME_QUERY, fetchPolicy: 'network-only' })
      .pipe(
        map((r) => r.data?.me as unknown as User),
        tap((user) => this.currentUser.set(user))
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(TOKEN_KEY);
    }
    this.currentUser.set(null);
    this.apollo.client.clearStore();
    this.router.navigate(['/auth/login']);
  }

  private setSession(payload: AuthPayload) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(TOKEN_KEY, payload.token);
    }
    this.currentUser.set(payload.user);
  }
}
