import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
} from '@angular/material';

import { ProductService } from './services/product.service';
import { AppConfigService } from './core/services/app-config.service';
import { HttpBaseService } from './core/services/httpbase.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { SearchService } from './services/search.service';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

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
    AddProductComponent
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
    HttpClientModule,
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
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initAppConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfiguration();
}
