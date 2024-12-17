import { CanActivate } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private readonly authService = inject(AuthService);
  canActivate() {
    return this.authService.isAuthenticated();
  }
}
