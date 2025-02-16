import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  cartItems: any[] = [];
  quantity: number = 1;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // this.isUserLoggedIn = this.authService.isAuthenticated(); // ✅ Check login status correctly

    // if (this.isUserLoggedIn) {
    //   this.loadCart();
    // }
  }


  // loadCart(): void {
  //   this.authService.getUserCart().subscribe((response) => {
  //     this.cartItems = response.items || [];
  //   });
  // }

  // openModal() {
  //   if (this.isUserLoggedIn) {
  //     let modal = new bootstrap.Modal(document.getElementById('cartModal'));
  //     modal.show();
  //   } else {
  //     alert('You must log in to view your cart.');
  //     this.router.navigate(['/login']);
  //   }
  // }

  // increaseQuantity(item: any) {
  //   item.quantity++;
  // }

  // decreaseQuantity(item: any) {
  //   if (item.quantity > 1) {
  //     item.quantity--;
  //   }
  // }


  // removeItem(itemId: number) {
  //   this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  //   console.log(`Item ${itemId} removed from cart.`);
  // }
  // goToCheckout() {
  //   this.router.navigate(['/checkout']);
  // }


  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.logout();
    this.isUserLoggedIn = false;
    this.cartItems = [];
    this.router.navigate(['/home']);
  }
}
