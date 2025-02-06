import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-product-form',
  templateUrl: './custom-product-form.component.html',
  styleUrls: ['./custom-product-form.component.css']
})
export class CustomProductFormComponent {
  customProductForm: FormGroup;
  productTypes = ['Dress', 'Shirt', 'Skirt', 'Pants']; // ENUM values

  constructor(private fb: FormBuilder) {
    this.customProductForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      product_type: ['', Validators.required],
      size: [''],
      color: [''],
      image_url: [''],
      notes: ['']
    });
  }
  // Define getter functions for cleaner template usage
get name() {
  return this.customProductForm.get('name');
}

get email() {
  return this.customProductForm.get('email');
}


  // Handle File Upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.customProductForm.patchValue({ image_url: file.name });
    }
  }

  // Handle Form Submission
  onSubmit() {
    if (this.customProductForm.valid) {
      console.log('Form Data:', this.customProductForm.value);
      alert('Your request has been submitted!');
      this.customProductForm.reset(); // Reset form after submission
    }
  }
}
