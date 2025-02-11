import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; // Import your API service

@Component({
  selector: 'app-editcategories',
  templateUrl: './editcategories.component.html',
  styleUrls: ['./editcategories.component.css']
})
export class EditcategoriesComponent implements OnInit {
  categoryId!: number;
  categoryData = {
    name: '',
    description: ''
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    public router: Router // Change from private to public
  ) {}


  ngOnInit(): void {
    // Get category ID from the route URL
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));

    console.log('Editing category ID:', this.categoryId); // Debugging

    // Load category details
    this.apiService.getCategoryById(this.categoryId).subscribe(
      (response) => {
        console.log('Category data loaded:', response);
        this.categoryData = response;
      },
      (error) => {
        console.error('Error loading category:', error);
        alert('Failed to load category data.');
      }
    );
  }


  cancelUpdate() {
    this.router.navigate(['/categories']);
  }


  updateCategory(): void {
    if (!this.categoryData.name) {
      alert('Category name is required!');
      return;
    }

    console.log('Updating category ID:', this.categoryId, 'with data:', this.categoryData);

    this.apiService.updateCategory(this.categoryId, this.categoryData).subscribe(
      (response) => {
        console.log('Update response:', response);
        alert('Category updated successfully!');
        this.router.navigate(['/categories']); // Redirect to categories list
      },
      (error) => {
        console.error('Error updating category:', error);
        alert('Failed to update category.');
      }
    );
  }

}
