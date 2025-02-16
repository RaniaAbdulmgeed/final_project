import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private router: Router, private cartService: CartService) {}
  cartItems: any[] = [];

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  increaseQuantity(index: number) {
    this.cartItems[index].quantity++;
    this.saveCart();
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    } else {
      this.removeFromCart(index);
    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  goToCheckout() {
    this.cartService.setCart(this.cartItems); // Store cart in service
    this.router.navigate(['/checkout']); // Navigate to checkout page
  }
}
