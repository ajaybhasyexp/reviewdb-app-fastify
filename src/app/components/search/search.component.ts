import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as $ from 'jquery';
import { ProductService } from 'src/app/services/product.service';
import { SearchService } from 'src/app/services/search.service';
import { debug } from 'util';
import { Product } from '../../models/product';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  suggestionsVisibility: boolean;
  searchText: string;
  products: Array<Product>;
  searchTerm$ = new Subject<string>();
  constructor(private searchService: SearchService) {
    this.searchService.search(this.searchTerm$).subscribe(response => {
      if (response) {
        this.suggestionsVisibility = true;
        this.products = response;
      } else {
        this.products = [];
        this.suggestionsVisibility = false;
      }
    },
      error => { });
    this.searchTerm$.subscribe(resp => {
      if (resp) {
        this.suggestionsVisibility = true;
      } else {
        this.suggestionsVisibility = false;
      }
    });
  }

  ngOnInit() {
    this.products = new Array<Product>();
  }

  slideToggle() {
    $('#master-categories').slideToggle();
  }

  searchProds() {
    // this.searchService.search(this.searchTerm$).subscribe(response => {
    //   this.products = response;
    //   console.log(this.products);
    // },
    //   error => { });
  }

}
