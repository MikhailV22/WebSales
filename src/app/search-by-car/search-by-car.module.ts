import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SearchByCarComponent } from '../search-by-car/search-by-car.component';

import { ResultPanelModule } from '../result-panel/result-panel.module';
import { WhouseDialogModule } from '../whouse-dialog/whouse-dialog.module';
import { AutoCatalogService } from '../services/AutoCatalogService';
import { ProdtypeDialogModule } from '../prodtype-dialog/prodtype-dialog.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SearchByCodeRoutingModule } from '../search-by-code/result-by-code-routing.module';
//import { WhouseDialogComponent } from '../whouse-dialog/whouse-dialog.component';

@NgModule({
  declarations: [
    SearchByCarComponent,
    //WhouseDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ResultPanelModule,
    WhouseDialogModule,
    ProdtypeDialogModule,
    MatButtonModule,
    MatIconModule,
    SearchByCodeRoutingModule

  ],
  
  exports:[SearchByCarComponent],
  providers: [
    AutoCatalogService
  ]
})
export class SearchByCarModule { }
