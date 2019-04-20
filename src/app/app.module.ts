import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { ArComponent } from './ar/ar.component';
import { NavbarComponent } from './partials/navbar/navbar.component';
import { HeaderComponent } from './partials/header/header.component';
import { BannerComponent } from './banner/banner.component';
import { FooterComponent } from './partials/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { SignUpComponent } from './sign-up/sign-up.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'virtual-try-on',
    component: ArComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ArComponent,
    NavbarComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    LoginComponent,
    ProductListComponent,
    ProductDetailsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes,
    ),
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
