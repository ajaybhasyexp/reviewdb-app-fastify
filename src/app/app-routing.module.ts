import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'review',
    component: AddReviewComponent
  },
  {
    path: 'product/:name',
    component: ProductDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
