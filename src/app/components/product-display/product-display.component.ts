import { Component, OnInit, Inject } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { AddReviewComponent } from '../add-review/add-review.component';
import { Utility } from 'src/app/core/helpers/utililies';
import { ActivatedRoute } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { ClientAction } from 'src/app/enums/client-action.enum';
import { Review } from 'src/app/models/review';
import { ReviewService } from 'src/app/services/review.service';
@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit {
  selectedProduct: Product;
  productId: string;
  user: SocialUser;
  loggedIn: boolean;
  reviews: Review[] = new Array<Review>();

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (Utility.isValidObjectInstance(this.productId)) {
      this.productService.getProductById(this.productId).subscribe(response => {
        this.selectedProduct = response;
        this.getReviews(this.selectedProduct._id);
      });
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  snakeCaseConvertor(name) {
    if (name.includes('_')) {
      const splitArray = name.split('_');
      let catName = '';
      splitArray.forEach(element => {
        catName += ' ' + element.charAt(0).toUpperCase() + element.slice(1);
      });
      return catName.trim();
    } else {
      return name;
    }

  }

  addReview() {
    const dialogRef = this.dialog.open(AddReviewComponent, {
      panelClass: 'full-screen-modal',
      data: { product: this.selectedProduct, uid: this.user.id, action: ClientAction.Add }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (Utility.isValidInstance(result)) {
        this.getReviews(this.selectedProduct._id);
      }
    });
  }

  getReviews(productId) {
    this.reviewService.getProductReviews(productId).subscribe(response => {
      this.reviews = response;
    });
  }

}
