import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent {
  productData = {
    name: '',
    description: '',
    category_id: null,
    price: null,
    discount: null,
    stock_quantity: null,
    size_options: '',
    color_options: '',
    image: null,
    state: 1 // Default state (1 = Active, 0 = Inactive)
  };

  constructor(private apiService: ApiService, public router: Router) {}

  // Handle file selection for image upload
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.productData.image = event.target.files[0]; // ✅ Store the selected file
      console.log('Selected image:', this.productData.image);
    }
  }

  addProduct(): void {
    if (!this.productData.name || !this.productData.category_id || !this.productData.price) {
      alert('Product name, category, and price are required!');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productData.name);
    formData.append('description', this.productData.description || '');
    formData.append('category_id', String(this.productData.category_id));
    formData.append('price', String(this.productData.price));
    formData.append('discount', this.productData.discount ? String(this.productData.discount) : '0');
    formData.append('stock_quantity', this.productData.stock_quantity ? String(this.productData.stock_quantity) : '0');
    formData.append('size_options', this.productData.size_options || '');
    formData.append('color_options', this.productData.color_options || '');
    formData.append('state', String(this.productData.state));

    if (this.productData.image) {
      formData.append('image', this.productData.image); // ✅ Make sure field name matches Laravel's validation
    }

    console.log('FormData before sending:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    this.apiService.createProduct(formData).subscribe(
      (response) => {
        console.log('Product created:', response);
        alert('Product created successfully!');
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('Error creating product:', error);
        alert('Failed to create product. See console for details.');
      }
    );
  }
}
