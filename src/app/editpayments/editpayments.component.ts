import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-editpayments',
  templateUrl: './editpayments.component.html',
  styleUrls: ['./editpayments.component.css']
})
export class EditpaymentsComponent implements OnInit {
  paymentId!: number;
  paymentData: any = {
    order_id: null,
    user_id: null,
    amount: null,
    status: 'pending',
    state: 1,
    payment_method: 'credit_card'
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Editing payment ID:', this.paymentId);

    this.apiService.getPaymentById(this.paymentId).subscribe(
      (response) => {
        console.log('Payment data loaded:', response);
        this.paymentData = { ...response };
      },
      (error) => {
        console.error('Error loading payment:', error);
        alert('Failed to load payment data.');
      }
    );
  }

  cancelUpdate() {
    this.router.navigate(['/payments']);
  }

  updatePayment(): void {
    if (!this.paymentData.order_id || !this.paymentData.user_id || !this.paymentData.amount) {
      alert('Order ID, User ID, and Amount are required!');
      return;
    }

    const allowedStatuses = ['pending', 'paid', 'failed'];
    if (!allowedStatuses.includes(this.paymentData.status)) {
      alert('Invalid status value! Allowed values: pending, paid, failed');
      return;
    }

    const updatedPaymentData = {
      order_id: Number(this.paymentData.order_id),
      user_id: Number(this.paymentData.user_id),
      amount: parseFloat(this.paymentData.amount),
      status: this.paymentData.status.toLowerCase().trim(),
      payment_method: String(this.paymentData.payment_method).trim(),
      state: 1
    };

    console.log('Updating payment ID:', this.paymentId, 'with data:', updatedPaymentData);

    this.apiService.updatePayment(this.paymentId, updatedPaymentData).subscribe(
      (response) => {
        console.log('Update response:', response);
        alert('Payment updated successfully!');
        this.router.navigate(['/payments']);
      },
      (error) => {
        console.error('Error updating payment:', error);
        console.error('Server Response:', error.error);

        if (error.status === 422) {
          alert('Validation error: ' + JSON.stringify(error.error));
        } else {
          alert('Failed to update payment. Please check input values.');
        }
      }
    );
  }
}
