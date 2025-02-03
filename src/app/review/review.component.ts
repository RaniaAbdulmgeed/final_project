import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviewForm: FormGroup;
  reviews: any[] = []; // Stores submitted reviews
  chunkedReviews: any[][] = [];
  stars: number[] = [1, 2, 3, 4, 5]; // Star ratings

  constructor(private fb: FormBuilder) {
    this.reviewForm = this.fb.group({
      name: ['', Validators.required],
      rating: [0, Validators.required],
      review: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadReviews(); // Load reviews from local storage
    this.chunkReviews();
  }

  selectRating(stars: number) {
    this.reviewForm.patchValue({ rating: stars });
  }

  submitReview() {
    if (this.reviewForm.valid) {
      const newReview = {
        ...this.reviewForm.value,
        timestamp: new Date(),
      };

      this.reviews.unshift(newReview);
      this.saveReviews(); // Save to local storage
      this.chunkReviews(); // Re-chunk the reviews after adding a new one

      // Reset form after submission
      this.reviewForm.reset({ rating: 0 });
    }
  }

  chunkReviews() {
    this.chunkedReviews = [];
    for (let i = 0; i < this.reviews.length; i += 4) {
      this.chunkedReviews.push(this.reviews.slice(i, i + 4));
    }
  }

  saveReviews() {
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  loadReviews() {
    const storedReviews = localStorage.getItem('reviews');
    if (storedReviews) {
      this.reviews = JSON.parse(storedReviews);
      this.chunkReviews(); // Re-chunk after loading
    }
  }
}
