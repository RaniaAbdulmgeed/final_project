import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final_project';
  showHeaderFooter = true;

  constructor(private router: Router) {
    // Watch the route and hide header/footer for specific routes
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;

      // Define routes where you don't want the header and footer
      const noHeaderFooterRoutes = ['/dashboard' , '/editusers' , '/editcategories' ,
        'editproducts/:id' , '/editorders' , '/editpayments' , '/login' , '/register']; // Add more routes if needed

      // Show or hide header/footer based on the current route
      this.showHeaderFooter = !noHeaderFooterRoutes.includes(currentRoute);
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']); // Example of navigating to the homepage
  }

}
