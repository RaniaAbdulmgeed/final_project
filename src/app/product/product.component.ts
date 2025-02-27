import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

}

export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  price: number;
  discount?: number;
  stock_quantity: number;
  size_options: string[];  // Ensure it's an array
  color_options: string[]; // Ensure it's an array
  image_url: string;
  state: number;
}
