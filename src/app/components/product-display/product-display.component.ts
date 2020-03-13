import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewComponent } from '../add-review/add-review.component';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  selectedProduct: Product;
  constructor(private productService: ProductService, public dialog: MatDialog) { }

  ngOnInit() {
    this.productService.getProductById('5e53770409c56c49a0733add').subscribe(response => {
      this.selectedProduct = response;
    });
  }

  addReview() {
    const dialogRef = this.dialog.open(AddReviewComponent, {
      panelClass: 'full-screen-modal',
      data: { action: 'tests' }
    });
  }

}
