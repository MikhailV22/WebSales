import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfirmComponent } from './confirm/confirm.component';
import { AuthGuard } from '../services/auth-guard.service';
// import { HeroListComponent }    from './hero-list.component';
// import { HeroDetailComponent }  from './hero-detail.component';

const cartRoutes: Routes = [
  { path: 'cart-confirm', 
    component: ConfirmComponent,
    canActivate: [AuthGuard] 
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(cartRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CartRoutingModule { }