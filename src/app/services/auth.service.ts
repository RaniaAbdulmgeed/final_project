import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
  
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('Full API Response:', response); // Debugging

        if (!response.user) {
          console.error('Error: Missing user data in response');
        } else {
          localStorage.setItem('userId', response.user.id);
        }

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
      })
    );
  }


  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, { headers: this.getAuthHeaders() }).subscribe(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('userId');
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== ''; // ✅ Ensures a valid token exists
  }


  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getUserCart(): Observable<any> {
    return this.http.get(`${this.apiUrl}/cart`, { headers: this.getAuthHeaders() });
  }
}
