import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-custom-product-form',
  templateUrl: './custom-product-form.component.html',
  styleUrls: ['./custom-product-form.component.css']
})
export class CustomProductFormComponent {
  customProductForm: FormGroup;
  productTypes = ['Sunglasses', 'Reading Glasses', 'Prescription Glasses']; // Example types

  selectedFile: File | null = null; // Store the file before submitting

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.customProductForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      product_type: ['', Validators.required],
      size: [''],
      color: [''],
      image_url: [null], // File will be stored separately
      notes: [''],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.customProductForm.valid) {
      const formData = new FormData();
      formData.append('name', this.customProductForm.get('name')?.value);
      formData.append('email', this.customProductForm.get('email')?.value);
      formData.append('product_type', this.customProductForm.get('product_type')?.value);
      formData.append('size', this.customProductForm.get('size')?.value || '');
      formData.append('color', this.customProductForm.get('color')?.value || '');
      formData.append('notes', this.customProductForm.get('notes')?.value || '');

      if (this.selectedFile) {
        formData.append('image_url', this.selectedFile);
      }

      this.apiService.submitCustomProduct(formData).subscribe({
        next: (response) => {
          alert('Product submitted successfully!');
          window.location.reload(); // Refresh the page
        },
        error: (error) => {
          console.error('Error:', error);
          alert('Failed to submit. Please try again.');
        }
      });
    }
  }

}
