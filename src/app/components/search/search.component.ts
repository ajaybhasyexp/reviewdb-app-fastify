import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { SearchService } from 'src/app/services/search.service';
import { Product } from '../../models/product';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

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
  constructor(private searchService: SearchService, private router: Router) {
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
  redirectToProductDisplay(name: string, id: string) {
    const routeName = name.replace(/( )+/g, '-');
    const productUrl = `/product/${routeName}/${id}`;
    this.router.navigate([productUrl]);
  }

  searchProds() {
    // this.searchService.search(this.searchTerm$).subscribe(response => {
    //   this.products = response;
    //   console.log(this.products);
    // },
    //   error => { });
  }
  redirectToProductByCat(catId :string,catName :string) {
    const name = catName.replace(/( )+/g, '-');
    const productListUrl= `/category/${name}/products/${catId}`
    this.router.navigate([productListUrl]);
  }

}
