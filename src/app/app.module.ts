import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import {
  MatFormFieldModule,
  MatInputModule,
  MatDialog
} from '@angular/material';

import { ProductService } from './services/product.service';
import { AppConfigService } from './core/services/app-config.service';
import { HttpBaseService } from './core/services/httpbase.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { SearchService } from './services/search.service';
import { UserService } from './services/user.service';
import { ReviewService } from './services/review.service';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { RatingComponent } from './components/rating/rating.component';
import { ProductDisplayComponent } from './components/product-display/product-display.component';
import { MaterialModule } from './material.module';
import { Data } from './core/helpers/data';

const config = new AuthServiceConfig([
  // {
  //   id: GoogleLoginProvider.PROVIDER_ID,
  //   provider: new GoogleLoginProvider('Google-OAuth-Client-Id')
  // },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1219653058045071')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TopNavComponent,
    AddProductComponent,
    AddReviewComponent,
    RatingComponent,
    ProductDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    SocialLoginModule,
    MaterialModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initAppConfig,
      deps: [AppConfigService],
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    ProductService,
    HttpBaseService,
    SearchService,
    UserService,
    ReviewService,
    Data
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initAppConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfiguration();
}
