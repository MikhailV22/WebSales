import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SearchByCodeComponent } from '../search-by-code/search-by-code.component';

import { ResultPanelModule } from '../result-panel/result-panel.module';
import { WhouseDialogModule } from '../whouse-dialog/whouse-dialog.module';
import { ProdtypeDialogModule } from '../prodtype-dialog/prodtype-dialog.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { SearchByCodeRoutingModule } from './result-by-code-routing.module';

// import { WhouseDialogComponent } from '../whouse-dialog/whouse-dialog.component';

@NgModule({
  declarations: [
    SearchByCodeComponent,
//    WhouseDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ResultPanelModule,
    WhouseDialogModule,
    ProdtypeDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SearchByCodeRoutingModule

  ],
  
  exports:[SearchByCodeComponent],
  providers: [
  ]
})
export class SearchByCodeModule { }
