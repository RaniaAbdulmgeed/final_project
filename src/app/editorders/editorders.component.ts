import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; // Import your API service

@Component({
  selector: 'app-editorders',
  templateUrl: './editorders.component.html',
  styleUrls: ['./editorders.component.css']
})
export class EditordersComponent implements OnInit {
  orderId!: number;
  orderData = {
    user_id: '',
    total_price: '',
    status: 'pending',
    payment_status: 'pending'
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router
  ) {}

  ngOnInit(): void {
    // Get order ID from the route
    const idFromRoute = this.route.snapshot.paramMap.get('id');

    if (idFromRoute) {
      this.orderId = Number(idFromRoute);
    } else {
      console.error("Order ID not found in the route.");
      alert("Invalid order ID.");
      this.router.navigate(['/orders']);
      return;
    }

    console.log('Editing order ID:', this.orderId);

    // Fetch order details
    this.apiService.getOrderById(this.orderId).subscribe(
      (response) => {
        if (response) {
          console.log('Order data loaded:', response);
          this.orderData = response as {
            user_id: string;
            total_price: string;
            status: string;
            payment_status: string;
          };

        } else {
          console.error('Empty response received.');
          alert('Order not found.');
          this.router.navigate(['/orders']);
        }
      },
      (error) => {
        console.error('Error loading order:', error);
        alert('Failed to load order data.\n' + error.message);
      }
    );
  }



  // Update order
  updateOrder(): void {
    if (!this.orderData.user_id) {
      alert('User ID is required!');
      return;
    }

    if (!this.orderId || this.orderId <= 0) {
      alert('Invalid order ID!');
      console.error('Invalid order ID:', this.orderId);
      return;
    }

    // Ensure "state" is included
    const updatedOrderData = {
      ...this.orderData,
      state: 1 // Add state if required by API
    };

    console.log('Updating order ID:', this.orderId, 'with data:', updatedOrderData);

    this.apiService.updateOrder(this.orderId, updatedOrderData).subscribe(
      (response) => {
        console.log('Update response:', response);
        alert('Order updated successfully!');
        this.router.navigate(['/orders']); // Redirect to orders list
      },
      (error) => {
        console.error('Error updating order:', error);
        alert('Failed to update order.');
      }
    );
  }



  // Cancel update and return to order list
  cancelUpdate() {
    this.router.navigate(['/orders']);
  }
}
