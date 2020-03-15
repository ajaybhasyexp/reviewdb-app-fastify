import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Review } from '../../models/review';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ClientAction } from 'src/app/enums/client-action.enum';
import { Utility } from 'src/app/core/helpers/utililies';
import { RatingComponent } from '../rating/rating.component';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  selectedReview: Review = new Review();
  addReviewForm: FormGroup;
  selectedProduct: Product;
  userId: string;
  @ViewChild(RatingComponent, { static: false }) rating: RatingComponent;

  constructor(
    public dialogRef: MatDialogRef<AddReviewComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reviewService: ReviewService) { }

  ngOnInit() {
    this.addReviewForm = this.formBuilder.group({
      titleFormControl: ['Review for', Validators.required],
      sideNoteControl: [''],
      detailedReviewControl: ['', Validators.required]
    });
    if (this.data.action === ClientAction.Add) {
      if (Utility.isValidInstance(this.data)) {
        debugger;
        this.selectedProduct = this.data.product;
        this.userId = this.data.uid;
      }
    }
  }

  CloseAddReviewModal() {
    this.dialogRef.close();
  }

  saveReview() {
    if (this.addReviewForm.valid) {
      this.selectedReview.rating = this.rating.selectedValue;
      this.selectedReview.userSocialId = this.userId;
      this.selectedReview.productId = this.selectedProduct._id
      this.reviewService.saveReview(this.selectedReview).subscribe(respone => {
        this.CloseAddReviewModal();
      });
    }

  }

}
