import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SearchByCodeComponent } from './search-by-code/search-by-code.component';
import { SearchByCarComponent } from './search-by-car/search-by-car.component';
import { OrdersComponent } from './orders/orders.component';

//import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './PageNotFound.component';
import { CartlistComponent } from './cart/cartlist/cartlist.component';
// import { ConfirmComponent } from './cart/confirm/confirm.component';
import { AuthGuard } from './services/auth-guard.service';

// import { ProdInfoComponent } from './prod-info/prod-info.component';



const appRoutes: Routes = [
//  { path: 'login', component: LoginComponent },
  { path: 'search-by-code', 
    component: SearchByCodeComponent,
    canActivate: [AuthGuard] 
  },
  { path: 'search-by-car', 
    component: SearchByCarComponent,
    canActivate: [AuthGuard] 
  },
  { path: 'orders', 
    component: OrdersComponent,
    canActivate: [AuthGuard] 
  },
  { path: 'cartlist', 
    component: CartlistComponent,
    canActivate: [AuthGuard] 
  },
  // { path: 'cart-confirm', 
  //   component: ConfirmComponent,
  //   canActivate: [AuthGuard] 
  // },
  // { path: 'prodinfo/:id', component: ProdInfoComponent },
//  { path: '',   redirectTo: '/search-by-car', pathMatch: 'full' },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
  	RouterModule
  ]
})
export class AppRoutingModule  { }
