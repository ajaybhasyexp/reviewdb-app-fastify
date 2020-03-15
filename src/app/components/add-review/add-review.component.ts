import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Review } from '../../models/review';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ClientAction } from 'src/app/enums/client-action.enum';
import { Utility } from 'src/app/core/helpers/utililies';
import { RatingComponent } from '../rating/rating.component';
import { ReviewService } from 'src/app/services/review.service';
import { FileData } from 'src/app/models/fileData';

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
  formData: FormData = new FormData();
  files: FileData[] = new Array<FileData>();

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
        this.selectedProduct = this.data.product;
        this.userId = this.data.uid;
      }
    }
    this.formData.append('tags', 'review_images');
  }

  CloseAddReviewModal() {
    this.dialogRef.close();
  }

  saveReview() {
    if (this.addReviewForm.valid) {
      this.reviewService.saveImages(this.formData);
      this.selectedReview.rating = this.rating.selectedValue;
      this.selectedReview.userSocialId = this.userId;
      this.selectedReview.productId = this.selectedProduct._id;
      this.reviewService.saveReview(this.selectedReview).subscribe(respone => {
        this.CloseAddReviewModal();
      });
    }

  }

  uploadedImagesOnSubscribe(event) {
    // this.files.push(event);
    event.forEach(element => {
      this.formData.append('file', element.img);
    });

  }
}
