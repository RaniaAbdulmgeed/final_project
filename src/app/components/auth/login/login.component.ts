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
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); // Store role in localStorage

        // Redirect based on role
        if (response.role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        alert('Invalid credentials');
      }
    );
  }
}
