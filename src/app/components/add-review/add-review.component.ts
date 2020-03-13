import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddReviewComponent>) { }

  ngOnInit() {
  }

  CloseAddReviewModal() {
    this.dialogRef.close();
  }

}
