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
        console.log('Login successful:', response); // Log full response

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        if (response.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.error('Login failed:', error); // Log full error details
        alert(error.error.message || 'Invalid credentials'); // Show actual error message from backend
      }
    );
  }

}
