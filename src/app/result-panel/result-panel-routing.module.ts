import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdInfoComponent } from '../prod-info/prod-info.component';
import { AuthGuard } from '../services/auth-guard.service';
// import { HeroListComponent }    from './hero-list.component';
// import { HeroDetailComponent }  from './hero-detail.component';

const searchResultRoutes: Routes = [
  // { path: 'heroes',  component: HeroListComponent },
  { path: 'prodinfo/:id', 
  	component: ProdInfoComponent,
    canActivate: [AuthGuard] 
     }
];

@NgModule({
  imports: [
    RouterModule.forChild(searchResultRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ResultPanelRoutingModule { }