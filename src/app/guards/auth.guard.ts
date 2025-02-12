import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
      return true; // Allow access to admin routes
    } else {
      this.router.navigate(['/home']); // Redirect customers to home
      return false;
    }
  }
}
