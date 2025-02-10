import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Laravel API URL

  constructor(private http: HttpClient) {}

  // Define httpOptions as a class property
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`, // Dynamically get token
      }),
    };
  }

  /****************************PAYMENTS APIS******************/
  //Replace with actual token logic
  private getToken(): string {
    return localStorage.getItem('auth_token') || ''; // Fetch from local storage (or other source)
  }

  //Get all payments
  getPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments`, this.getHttpOptions());
  }

  //Get payment by ID
  getPaymentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments/${id}`, this.getHttpOptions());
  }

  //Insert new payment
  createPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments`, data, this.getHttpOptions());
  }

  //Update payment
  updatePayment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/payments/${id}`, data, this.getHttpOptions());
  }

  //Soft delete payment
  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/payments/${id}`, this.getHttpOptions());
  }
}
