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
import { ImageService } from 'src/app/services/image.service';

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
  files: FileData[] = new Array<FileData>();

  constructor(
    public dialogRef: MatDialogRef<AddReviewComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reviewService: ReviewService,
    private imageService: ImageService) { }

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
  }

  CloseAddReviewModal() {
    this.dialogRef.close();
  }

  saveReview() {
    if (this.addReviewForm.valid) {
      if (this.files.length > 0) {
        this.imageService.saveReviewImages(this.files).subscribe(response => {
          this.selectedReview.imageUrl = response.secure_url;
          this.saveReviewObject();
        });
      } else {
        this.saveReviewObject();
      }
    }
  }

  saveReviewObject() {
    this.selectedReview.rating = this.rating.selectedValue;
    this.selectedReview.userSocialId = this.userId;
    this.selectedReview.productId = this.selectedProduct._id;
    this.reviewService.saveReview(this.selectedReview).subscribe(respone => {
      this.CloseAddReviewModal();
    });
  }

  uploadedImagesOnSubscribe(event) {
    this.files = event;
  }
}
