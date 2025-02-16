import { Component, AfterViewInit, OnInit } from '@angular/core';
import AOS from 'aos';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categoryProducts: any[] = []; // Store fetched products
  cartItems: any[] = [];
  wishlist: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategoryProducts(13); // Fetch products from category 13

  }

  loadCategoryProducts(categoryId: number): void {
    this.apiService.getProductsByCategory(categoryId).subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.categoryProducts = response; // Corrected API response handling
        } else {
          console.error('Unexpected API response:', response);
          this.categoryProducts = []; // Fallback
        }
        console.log('Fetched products:', this.categoryProducts);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


  ngAfterViewInit() {
    setTimeout(() => {
      AOS.init();
      AOS.refresh();
    }, 100);  // Delay ensures AOS detects new elements
  }

  /************************** Cart Functions **************************/
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

    console.log('Cart:', this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));

    // Show alert when added to cart
    this.showAlert();
  }

  ngOnInit2(): void {
    this.loadWishlist();
  }

  loadWishlist() {
    const storedWishlist = localStorage.getItem('wishlist');
    this.wishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  }

  addToWishlist(product: any) {
    if (!this.wishlist.find((item) => item.id === product.id)) {
      this.wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));

      // Alert and redirect to wishlist page
      if (confirm('Product added to Wishlist! ❤️\nView your wishlist?')) {
        this.router.navigate(['/wishlist']);
      }
    } else {
      alert('This product is already in your Wishlist.');
    }
  }

  showAlert() {
    if (confirm("Product added successfully! \nDo you want to view your cart?")) {
      this.router.navigate(['/cart']); // Navigate to cart page
    }
  }
}
