import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service'; // Import your API service
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
      private apiService: ApiService,
      public router: Router) {
    this.contactForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.apiService.submitContactForm(this.contactForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Message sent successfully!';
          this.contactForm.reset();
        },
        error: (error) => {
          console.error('Error submitting contact form', error);
        }
      });
    }
  }
}
