import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewComponent } from '../add-review/add-review.component';
import { Data } from 'src/app/core/helpers/data';
import { Utility } from 'src/app/core/helpers/utililies';
import { debug } from 'util';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  selectedProduct: Product;
  constructor(private productService: ProductService, public dialog: MatDialog, private data: Data) { }

  ngOnInit() {
    if (Utility.isValidObjectInstance(this.data)) {
      this.productService.getProductById(this.data.storage.pid).subscribe(response => {
        this.selectedProduct = response;
      });
    }
  }

  addReview() {
    const dialogRef = this.dialog.open(AddReviewComponent, {
      panelClass: 'full-screen-modal',
      data: { pid: this.selectedProduct._id }
    });
  }

}
