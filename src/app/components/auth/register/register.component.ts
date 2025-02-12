import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { name: '', email: '', password: '', phone: '', address: '', role: 'customer' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        alert('Registration failed');
      }
    );
  }
}
