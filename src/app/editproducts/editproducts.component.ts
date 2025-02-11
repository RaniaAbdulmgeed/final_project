import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editproducts',
  templateUrl: './editproducts.component.html',
  styleUrls: ['./editproducts.component.css']
})
export class EditproductsComponent implements OnInit {
  productData = {
    name: '',
    description: '',
    category_id: null as number | null,
    price: null as number | null,
    discount: null as number | null,
    stock_quantity: null as number | null,
    size_options: '',
    color_options: '',
    image: null as File | null,
    state: 1
  };

  product_id: number | null = null;
  categories = [
    { id: 1, name: "Men's" },
    { id: 2, name: "Women's" },
    { id: 3, name: "Kids" }
  ];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.product_id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.product_id) {
      this.loadProduct();
    }
  }

  loadProduct() {
    this.apiService.getProductById(this.product_id!).subscribe(
      (response) => {
        console.log('API Response:', response);

        if (Array.isArray(response)) {
          console.error('❌ Unexpected array response format:', response);
          return;
        }

        if (!response || !response.product) {
          console.error('❌ Response does not contain product:', response);
          return;
        }

        const product = response.product; // Declare `product` outside the `if` block

        this.productData = {
          name: product.name,
          description: product.description,
          category_id: product.category_id,
          price: product.price ? parseFloat(product.price) : null,
          discount: product.discount ? parseFloat(product.discount) : null,
          stock_quantity: product.stock_quantity ? parseInt(product.stock_quantity, 10) : null,
          size_options: JSON.stringify(product.size_options),
          color_options: JSON.stringify(product.color_options),
          image: null,
          state: product.state || 1
        };

        console.log('✅ Product loaded successfully:', this.productData);
      },
      (error) => {
        console.error('❌ Error loading product:', error);
      }
    );
  }




  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.productData.image = event.target.files[0];
    }
  }

  updateProduct(): void {
    const formData = new FormData();
    formData.append('name', this.productData.name);
    formData.append('description', this.productData.description || '');
    formData.append('category_id', this.productData.category_id?.toString() || '');
    formData.append('price', this.productData.price?.toString() || '');
    formData.append('discount', this.productData.discount?.toString() || '0');
    formData.append('stock_quantity', this.productData.stock_quantity?.toString() || '0');
    formData.append('size_options', this.productData.size_options || '');
    formData.append('color_options', this.productData.color_options || '');
    formData.append('state', String(this.productData.state));

    if (this.productData.image) {
      formData.append('image', this.productData.image);
    }

    this.apiService.updateProduct(this.product_id!, formData).subscribe(
      (response) => {
        alert('✅ Product updated successfully!');
        this.router.navigate(['/products']);
      },
      (error) => {
        console.error('❌ Error updating product:', error);
        alert('Failed to update product. See console for details.');
      }
    );
  }

}
