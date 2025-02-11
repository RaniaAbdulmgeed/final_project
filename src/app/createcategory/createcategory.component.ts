import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreatecategoryComponent {
  categoryData = {
    name: '',
    description: '',
    state: 1 // Default state (1 = Active, 0 = Inactive)
  };

  constructor(private apiService: ApiService, public router: Router) {}

  addCategory(): void {
    if (!this.categoryData.name) {
      alert('Category name is required!');
      return;
    }

    console.log('Creating category with data:', this.categoryData); // Debugging

    this.apiService.createCategory(this.categoryData).subscribe(
      (response) => {
        console.log('Category created:', response);
        alert('Category created successfully!');
        this.router.navigate(['/categories']); // Redirect to categories list
      },
      (error) => {
        console.error('Error creating category:', error);
        alert('Failed to create category.');
      }
    );
  }
}
