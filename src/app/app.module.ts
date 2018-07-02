import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
//import { NgControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import {NoopAnimationsModule} from '@angular/platform-browser/animations';
 import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import { RouterModule, Routes } from '@angular/router';
//import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';

//import {MatSidenavModule} from '@angular/material/sidenav';
//import {MatDialogModule} from '@angular/material/dialog';
//import {MatInputModule} from '@angular/material/input';
//import {MatFormFieldModule} from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';

// import { ApiResultService } from './services/ApiResultService';
// import { ApiGoodsResultService } from './services/ApiGoodsResultService';
import { UserService } from './services/UserService';
import { LogService } from './services/LogService';
import { DeliveryAddressService } from './services/DeliveryAddressService';


import { SearchParam } from './entity/SearchParam';

import { PageNotFoundComponent } from './PageNotFound.component';

/* Login Imports */
import { LoginModule } from './login/login.module';

import { SearchByCodeModule } from './search-by-code/search-by-code.module';
import { SearchByCarModule } from './search-by-car/search-by-car.module';
import { CartModule } from './cart/cart.module';
import { CartBannerComponent } from './cart/cart-banner/cart-banner.component';
import { ProdInfoComponent } from './prod-info/prod-info.component';

import { OrdersModule } from './orders/orders.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    CartBannerComponent,
    ProdInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    // MatSidenavModule,
    SearchByCodeModule,
    SearchByCarModule,
    CartModule,
    MatIconModule,
    MatMenuModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatNativeDateModule,
    // MatMomentDateModule,
    // MatRadioModule,
    // MatDatepickerModule,
    LoginModule,
    AppRoutingModule,
    OrdersModule
  ],
  providers: [
    UserService,
    SearchParam,
    DeliveryAddressService,
    LogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
