import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, ButtonModule, CardModule, InputTextModule, PasswordModule, MessageModule],
  templateUrl: './register.html',
})
export class Register {
  private auth = inject(AuthService);
  private router = inject(Router);

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  loading = signal(false);
  error = signal<string | null>(null);

  submit() {
    if (!this.firstName || !this.lastName || !this.email || !this.password) return;

    this.loading.set(true);
    this.error.set(null);

    this.auth.register(this.email, this.password, this.firstName, this.lastName).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.error.set(err.message ?? 'Registration failed. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
