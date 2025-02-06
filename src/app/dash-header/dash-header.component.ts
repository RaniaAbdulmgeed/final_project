import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrls: ['./dash-header.component.css']
})
export class DashHeaderComponent {
  constructor(private router: Router) {}

  logout() {
    // Redirect to homepage
    this.router.navigate(['/home']);
  }

}
