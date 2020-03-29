import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { ProductListComponent } from './components/product-list/product-list.component';
const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'review',
    component: AddReviewComponent
  },
  {
    path: 'product/:name/:id',
    component: ProductDisplayComponent
  },
  {
    path: 'category/:name/products/:id',
    component: ProductListComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
