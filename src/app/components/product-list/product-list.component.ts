import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProductService } from 'src/app/services/product.service';
import { ReviewService } from 'src/app/services/review.service';
import { Product } from '../../models/product';
import { Review } from '../../models/review';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  catId: string;
  productLimit:number;
  reviewLimit:number;
  catName: string;
  user: SocialUser;
  loggedIn: boolean;
  products: Array<Product>;
  reviews: Array<Review>;
  constructor(private productService: ProductService,
    private reviewService:ReviewService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.catId = this.route.snapshot.paramMap.get('id');
    this.bindProductsList();
    this.bindReviews();    
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  bindProductsList() {
    this.productLimit=10;
    this.productService.getProductByCatId(this.catId,this.productLimit).subscribe(response => {
      if (response) {   
        console.log(response);    
        this.products = response;
      }
    });
  }
  bindReviews() {
    this.reviewLimit=5;
    this.reviewService.getReviewsByCategory(this.catId,this.reviewLimit).subscribe(response => {
      if (response) {      
        this.reviews = response;
        console.log(response); 
      }
    });
  }
}
