import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';

import { ApiResultService } from '../services/ApiResultService';
import { ApiGoodsResultService } from '../services/ApiGoodsResultService';
import { CartService } from '../services/CartService';


// import { UserService } from './services/UserService';

// import { SearchByCodeComponent } from '../search-by-code/search-by-code.component';
import { ResultPanelComponent } from '../result-panel/result-panel.component';
import { ProdComponent } from './prod/prod.component';
import { GoodsPanelComponent } from './goods-panel/goods-panel.component';

import { ResultPanelRoutingModule } from './result-panel-routing.module';
import { ProdPanelComponent } from './prod-panel/prod-panel.component';
import { ProdImagesModule } from '../prod-images/prod-images.module'


@NgModule({
  declarations: [
    // SearchByCodeComponent,
    ResultPanelComponent,
    ProdComponent,
    GoodsPanelComponent,
    ProdPanelComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    ResultPanelRoutingModule,
    ProdImagesModule
  ],
  
  exports:[ResultPanelComponent],
  providers: [
  	ApiResultService,
  	ApiGoodsResultService,
    CartService
  ]
})
export class ResultPanelModule { }
