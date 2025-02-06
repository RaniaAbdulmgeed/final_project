import { Component } from '@angular/core';

@Component({
  selector: 'app-men',
  templateUrl: './men.component.html',
  styleUrls: ['./men.component.css']
})
export class MenComponent {
  searchQuery = '';
  quantity: number = 1;

  sortOption = 'price';
  userRating: number = 0;
  isWishlisted: boolean = false;

  stars: number[] = [1, 2, 3, 4, 5];


  addToCart(product:any) {
    console.log('تمت إضافة', product.name, 'إلى السلة');
  }



  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  rateProduct(rating: number) {
    this.userRating = rating;
    console.log('تم تقييم المنتج:', rating);
  }

  addToWishlist() {
    console.log('تمت إضافة المنتج إلى المفضلة');
  }
  toggleWishlist() {
    this.isWishlisted = !this.isWishlisted;
  }
}
