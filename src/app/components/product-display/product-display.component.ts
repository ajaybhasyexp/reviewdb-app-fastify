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

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (Utility.isValidObjectInstance(this.productId)) {
      this.productService.getProductById(this.productId).subscribe(response => {
        this.selectedProduct = response;
      });
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  addReview() {
    const dialogRef = this.dialog.open(AddReviewComponent, {
      panelClass: 'full-screen-modal',
      data: { product: this.selectedProduct, uid: this.user.id, action: ClientAction.Add }
    });
  }

}
