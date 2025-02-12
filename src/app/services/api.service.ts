import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product.model'; // Import the model
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

  private getToken(): string {
    return localStorage.getItem('auth_token') || ''; // Fetch from local storage
  }

    /**************************** PRODUCTS APIs ****************************/

    getProducts(): Observable<Product[]> {
      return this.http.get<{ data: Product[] }>(`${this.apiUrl}/products`).pipe(
        map(response => response.data) // Extract the 'data' array
      );
    }

    getProductById(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/products/${id}`, this.getHttpOptions());
    }

    createProduct(data: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}/products`, data, {
        headers: { }, // ✅ Do NOT manually set Content-Type
      });
    }


    updateProduct(id: number, data: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/products/${id}`, data, this.getHttpOptions());
    }

    patchProduct(productId: number, formData: FormData): Observable<any> {
      return this.http.patch(`${this.apiUrl}/${productId}`, formData);
    }

    deleteProduct(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/products/${id}`, this.getHttpOptions());
    }

  /**************************** PAYMENTS APIs ****************************/
  getPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments`, this.getHttpOptions());
  }

  getPaymentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments/${id}`, this.getHttpOptions());
  }

  createPayment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments`, data, this.getHttpOptions());
  }

 // Update Payment API Call
  updatePayment(id: number, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/payments/${id}`, data, this.getHttpOptions());
}

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/payments/${id}`, this.getHttpOptions());
  }

  /**************************** CATEGORIES APIs ****************************/
  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`, this.getHttpOptions());
  }

  getCategoryById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/${id}`, this.getHttpOptions());
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, data, this.getHttpOptions());
  }

// Update category
updateCategory(id: number, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/categories/${id}`, data, this.getHttpOptions());
}

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/${id}`, this.getHttpOptions());
  }

  /**************************** ORDERS APIs ****************************/
  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`, this.getHttpOptions());
  }

  // Fetch order by ID
  getOrderById(orderId: number) {
    console.log('Fetching order with ID:', orderId);
    const url = `http://localhost/final_laravel/public/api/orders/${orderId}`;
    console.log('Request URL:', url);

    return this.http.get(url);
  }


  createOrder(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/orders`, data, this.getHttpOptions());
  }

 // Update order
  updateOrder(orderId: number, orderData: any) {
  return this.http.patch(`http://localhost/final_laravel/public/api/orders/${orderId}`, orderData);
}



  deleteOrder(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/orders/${id}`, this.getHttpOptions());
  }

  /**************************CONTACTS******************** */
  submitContactForm(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, formData, this.getHttpOptions());
  }

  /***********************REVIEWS************************* */
// Submit review
submitReview(reviewData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/reviews`, reviewData, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  });
}

// Get reviews
getReviews(): Observable<any> {
  return this.http.get(`${this.apiUrl}/reviews`);
}


}
