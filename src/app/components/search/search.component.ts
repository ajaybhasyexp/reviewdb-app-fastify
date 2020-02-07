import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import * as $ from 'jquery';
import { ProductService } from 'src/app/services/product.service';
import { debug } from 'util';
import { Product } from '../../models/product';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  suggestionsVisibility: boolean;
  searchText: string;
  products: Array<Product>;
  constructor(private prodService: ProductService) { }

  ngOnInit() {
    this.products = new Array<Product>();
  }

  slideToggle() {
    $('#master-categories').slideToggle();
  }
  searchProds() {
    this.prodService.getProducts(this.searchText).subscribe(response => {
      this.products = response;
    },
      error => { });

  }

}
