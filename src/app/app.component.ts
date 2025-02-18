import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final_project';
  showHeaderFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;

        // قائمة بالمسارات التي يجب أن تخفي الهيدر والفوتر
        const noHeaderFooterRoutes = [
          '/dashboard', '/editusers', '/editcategories', '/editorders',
          '/editpayments', '/login', '/register', '/editproducts'
        ];

        // إخفاء الهيدر والفوتر إذا كان المسار يطابق أي من القيم في القائمة
        this.showHeaderFooter = !noHeaderFooterRoutes.some(route => currentRoute.startsWith(route));
      }
    });
  }
}
