import { Component } from '@angular/core';
import { faHome, faUser, faStore, faBoxes, faShoppingCart, faCogs,
  faPen } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  faHome = faHome;            // Dashboard
  faUser = faUser;            // Users
  faStore = faStore;          // Categories
  faBoxes = faBoxes;          // Products
  faShoppingCart = faShoppingCart;  // Orders
  faCogs = faCogs;            // Custom Product
  faPen = faPen;      
           // Sidebar Toggle Icon
  // Variable to track the currently displayed table content
  currentTable: string = 'dashboard'; // Default view is 'dashboard'

  // Function to toggle between different table views
  toggleTable(table: string) {
    this.currentTable = table;
  }
   // Sample product data
  products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      category: 'Category 1',
      price: 100,
      discount: 10,
      stock_quantity: 50,
      size_options: ['Small', 'Medium', 'Large'],
      color_options: ['Red', 'Blue', 'Green'],
      image_url: 'https://via.placeholder.com/50'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      category: 'Category 2',
      price: 200,
      discount: 15,
      stock_quantity: 30,
      size_options: ['Medium', 'Large'],
      color_options: ['Black', 'White'],
      image_url: 'https://via.placeholder.com/50'
    }
    // More products can be added here
  ];

  // Format size options for display
  formatSizes(sizes: string[]): string {
    return sizes.join(', ');
  }

  // Format color options for display
  formatColors(colors: string[]): string {
    return colors.join(', ');
  }

  // Delete product based on ID
  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }

}


