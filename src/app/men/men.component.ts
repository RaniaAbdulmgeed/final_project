import { Component, AfterViewInit, OnInit } from '@angular/core';
import AOS from 'aos';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent {
  shirts: any[] = [];
  trousers: any[] = [];
  shoes: any[] = [];
  cartItems: any[] = [];
  wishlist: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategoryProducts(6, 'shirts'); // Category ID for Shirts
    this.loadCategoryProducts(7, 'trousers'); // Category ID for Trousers
    this.loadCategoryProducts(8, 'shoes'); // Category ID for Shoes
  }

  loadCategoryProducts(categoryId: number, section: string): void {
    this.apiService.getProductsByCategory(categoryId).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          if (section === 'shirts') this.shirts = response;
          else if (section === 'trousers') this.trousers = response;
          else if (section === 'shoes') this.shoes = response;
        } else {
          console.error('Unexpected API response:', response);
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({
        id: product.id,
        name: product.name,
        price: product.discount > 0
          ? product.price - (product.price * product.discount / 100)
          : product.price,
        image: product.image_url || 'assets/default.png',
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.showAlert();
  }

  addToWishlist(product: any) {
    if (!this.wishlist.find((item) => item.id === product.id)) {
      this.wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

      if (confirm('Product added to Wishlist! ❤️\nView your wishlist?')) {
        this.router.navigate(['/wishlist']);
      }
    } else {
      alert('This product is already in your Wishlist.');
    }
  }

  showAlert() {
    if (confirm("Product added successfully! \nDo you want to view your cart?")) {
      this.router.navigate(['/cart']);
    }
  }
}
