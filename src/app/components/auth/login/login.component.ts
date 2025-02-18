import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        console.log('Login successful:', response); // Log response

        if (!response.token) {
          alert('Error: Token is missing from response.');
          return;
        }

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        this.router.navigate([response.role === 'admin' ? '/dashboard' : '/home']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert(error.error?.message || 'Invalid credentials');
      }
    );
  }


}
