import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  reviews: any[] = [];
  stars = [1, 2, 3, 4, 5];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private apiService: ApiService, // Use ApiService instead of ReviewService
    public router: Router
  ) {
    this.reviewForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.fetchReviews();
  }

  // Submit Review
  submitReview() {
    if (this.reviewForm.valid) {
      this.apiService.submitReview(this.reviewForm.value).subscribe({
        next: (response) => {
          console.log(response);
          alert('Review submitted successfully!');
          this.reviewForm.reset(); // Reset form
          this.fetchReviews(); // Reload reviews
        },
        error: (error) => {
          console.error('Error submitting review:', error);
        }
      });
    }
  }

  // Fetch Reviews
  fetchReviews() {
    this.apiService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data;
      },
      error: (error) => {
        console.error('Error fetching reviews:', error);
      }
    });
  }

  // Handle Star Selection
  selectRating(star: number) {
    this.reviewForm.patchValue({ rating: star });
  }
}
