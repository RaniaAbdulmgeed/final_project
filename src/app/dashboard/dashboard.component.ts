import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { faHome, faUser, faStore, faBoxes, faShoppingCart, faCogs, faPen } from '@fortawesome/free-solid-svg-icons';
// Move type definition outside the @Component decorator
type TableType = 'dashboard' | 'users' | 'categories' | 'products' | 'orders' | 'payments' | 'contacts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //FontAwesome Icons
  faHome = faHome;
  faUser = faUser;
  faStore = faStore;
  faBoxes = faBoxes;
  faShoppingCart = faShoppingCart;
  faCogs = faCogs;
  faPen = faPen;
  //Strictly typed currentTable
  currentTable: TableType = 'dashboard';

  /******************************** Products****************************/
  products: any[] = [];

  loadProducts(): void {
    this.apiService.getProducts().subscribe(
      (products: any[]) => {
        this.products = products.map(product => ({
          id: product.Product_ID,
          name: product.Product_Name,
          description: product.Product_Description,
          category_id: product.Category_ID,
          price: product.Price,
          discount: product.Discount,
          stock_quantity: product.Stock_Quantity,
          size_options: product.Size_Options,
          color_options: product.Color_Options,
          image_url: product.Image_URL
        }));

        console.log('Products array assigned:', this.products); // Debugging
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }


  deleteProduct(id: number, event: Event): void {
    event.preventDefault(); // 🔥 Prevents default link behavior

    if (!confirm('Are you sure you want to delete this product?')) return; // Confirm before deleting

    this.apiService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id); // ✅ Remove from UI
        console.log('Product deleted:', id);
      },
      (error) => {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    );
  }


// Edit product function (Navigate or open modal)
editProduct(id: number): void {
  console.log('Edit product:', id);
  // Implement edit logic here (e.g., navigate to edit form)
}

// View product details function
viewProductDetails(id: number): void {
  console.log('View product details:', id);
  // Implement details logic here (e.g., show modal with product info)
}

// Add product function
addProduct(): void {
  this.router.navigate(['/createproduct']);
}

  /******************************PAYMENT APIS************************/
  //Payments array with proper type
  payments: any[] = [];

  constructor(private apiService: ApiService , public router: Router) {}

  ngOnInit(): void {
    this.loadPayments();
    this.loadProducts();
    this.loadCategories();
    this.loadOrders();
  }

  //Correctly defined function
  toggleTable(table: TableType): void {
    this.currentTable = table;
  }

  //Fetch all payments from Laravel API
  // Fetch all payments
  loadPayments(): void {
    this.apiService.getPayments().subscribe(
      (response) => {
        if (response && response.data) {
          this.payments = response.data;
        } else {
          console.warn('Unexpected API response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching payments', error);
      }
    );
  }

  // Navigate to edit payment page
  editPayment(id: number): void {
    console.log('Edit payment:', id);
    this.router.navigate(['/editpayments', id]); // Redirects to edit page with payment ID
  }

  // Delete payment with confirmation
  deletePayment(id: number): void {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.apiService.deletePayment(id).subscribe(
        () => {
          this.payments = this.payments.filter(payment => payment.id !== id);
          alert('Payment deleted successfully.');
        },
        (error) => {
          console.error('Error deleting payment', error);
          alert('Failed to delete payment.');
        }
      );
    }
  }

  viewPaymentDetails(id: number): void {
    console.log('View details for payment:', id);
    this.router.navigate(['/payment-details', id]); // Redirect to details page
  }

  addPayment(): void {
    console.log('Add new payment');
    this.router.navigate(['/add-payment']); // Redirect to add payment page
  }

  /************************************Categories***********************/
  categories: any[] = [];

  loadCategories(): void {
    this.apiService.getCategories().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.categories = response.data.map((category: any) => ({
            Category_ID: category.Category_ID,
            Category_Name: category.Category_Name,
            Category_Description: category.Category_Description,
            Created_At: category.Created_At
          }));
          console.log('Categories loaded:', this.categories);
        } else {
          console.warn('Unexpected API response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  // Navigate to the category creation page
  addCategory(): void {
    this.router.navigate(['/createcategory']);
  }


  deleteCategory(id: number, event: Event): void {
    event.preventDefault(); // Stop page reload

    if (!confirm("Are you sure you want to delete this category?")) return;

    this.apiService.deleteCategory(id).subscribe(
      (response) => {
        console.log('Category deleted successfully:', response);
        this.categories = this.categories.filter(category => category.Category_ID !== id);
      },
      (error) => {
        console.error('Error deleting category:', error);
        alert(error.error.message || "Failed to delete category.");
      }
    );
  }



  /*********************************Orders*********************************/
  orders: any[] = [];
  loadOrders(): void {
    this.apiService.getOrders().subscribe(
      (response: any) => {
        if (response && response.data) {
          this.orders = response.data; // Extract data array
          console.log('Orders array assigned:', this.orders); // Debugging
        } else {
          console.warn('Unexpected API response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  deleteOrder(id: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.apiService.deleteOrder(id).subscribe(
        () => {
          this.orders = this.orders.filter(order => order.Order_ID !== id);
          console.log(`Order ${id} deleted successfully`);
        },
        (error) => {
          console.error('Error deleting order', error);
        }
      );
    }
  }

  editOrder(id: number): void {
    this.router.navigate(['/editorders', id]); // Redirect to edit order page with ID
  }
}


