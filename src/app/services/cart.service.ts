import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private cartItems: any[] = []; // مصفوفة لتخزين المنتجات
  private cart: any[] = [];

  constructor() {}

  // ✅ إضافة المنتج إلى السلة
  // addToCart(product: any) {
  //   this.cartItems.push(product);
  //   console.log('🛒 المنتجات في السلة:', this.cartItems); // لمراقبة المنتجات في Console
  // }

  // ✅ جلب جميع المنتجات المخزنة في السلة
  // getCart() {
  //   return this.cartItems;
  // }

  // ✅ حذف منتج من السلة
  // removeFromCart(index: number) {
  //   this.cartItems.splice(index, 1);
  // }


  addToCart(product: any) {
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  updateCart(cart: any[]) {
    this.cart = cart;
  }

  /**cart in checkout page */
  private cartItems: any[] = [];

  setCart(cart: any[]) {
    this.cartItems = cart;
  }

  getCart(): any[] {
    return this.cartItems;
  }
}
