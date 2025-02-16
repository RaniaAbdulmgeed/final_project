import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  user_id = 1; // Replace with actual user ID from authentication
  first_name = '';
  last_name = '';
  email = '';
  billing_address = '';
  payment_method = 'credit';
  total_amount = 0;

  constructor(private cartService: CartService, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.total_amount = this.getTotalPrice();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  completePurchase() {
    if (!this.billing_address || !this.first_name || !this.last_name) {
      alert('Please fill in all required fields.');
      return;
    }

    this.total_amount = this.getTotalPrice(); // Ensure price is updated before sending

    const checkoutData = {
      user_id: this.user_id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      billing_address: this.billing_address,
      payment_method: this.payment_method,
      total_amount: this.total_amount,
      cart: this.cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }))
    };

    // **Replace with your actual API URL**
    this.http.post('http://localhost:8000/api/checkout', checkoutData).subscribe(
      (response: any) => {
        alert('Payment successful! 🎉 Your order has been placed.');
        localStorage.removeItem('cart'); // Clear cart after checkout
        this.router.navigate(['/order-confirmation']); // Redirect to confirmation page
      },
      (error) => {
        console.error('Checkout error:', error);
        alert('Payment failed. Please try again.');
      }
    );
  }
}
