import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Review } from '../../models/review';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  selectedReview: Review;

  constructor(public dialogRef: MatDialogRef<AddReviewComponent>) { }

  ngOnInit() {
  }

  CloseAddReviewModal() {
    this.dialogRef.close();
  }

}
