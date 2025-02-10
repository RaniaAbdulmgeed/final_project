import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { faHome, faUser, faStore, faBoxes, faShoppingCart, faCogs, faPen } from '@fortawesome/free-solid-svg-icons';

// ✅ Move type definition outside the @Component decorator
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
/******************************PAYMENT APIS************************/
  //Payments array with proper type
  payments: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  //Correctly defined function
  toggleTable(table: TableType): void {
    this.currentTable = table;
  }

  //Fetch all payments from Laravel API
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
  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
  deletePayment(paymentId: number): void {
    if (confirm('Are you sure you want to delete this payment?')) {
      this.apiService.deletePayment(paymentId).subscribe(
        () => {
          this.payments = this.payments.filter(payment => payment.id !== paymentId);
        },
        (error) => {
          console.error('Error deleting payment', error);
        }
      );
    }
  }
/************************************************************ */
}
