import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdInfoComponent } from '../prod-info/prod-info.component';
import { AuthGuard } from '../services/auth-guard.service';
import { SearchByCodeComponent } from '../search-by-code/search-by-code.component';
import { SearchByCarComponent } from '../search-by-car/search-by-car.component';
// import { HeroListComponent }    from './hero-list.component';
// import { HeroDetailComponent }  from './hero-detail.component';

const searchByRoutes: Routes = [
  { path: 'search-by-code', 
    component: SearchByCodeComponent,
    canActivate: [AuthGuard] 
  },
  { path: 'search-by-car', 
    component: SearchByCarComponent,
    canActivate: [AuthGuard] 
  },


];

@NgModule({
  imports: [
    RouterModule.forChild(searchByRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SearchByCodeRoutingModule { }