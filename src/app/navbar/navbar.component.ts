import { Component } from '@angular/core';
declare var bootstrap: any;
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  /*************CART FUNCTIONS************** */
  quantity: number = 1;
  openModal() {
    let modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
  }
increaseQuantity() {
  this.quantity++;
}
decreaseQuantity() {
  if (this.quantity > 1) {
    this.quantity--;
  }
}
removeItem() {
  console.log("تم حذف العنصر من السلة");
}
/**************************BUTTONS OF LOGIN AND LOGOUTAND REGISTER BUTTONS **************************** */
constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.router.navigate(['/login']);
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
