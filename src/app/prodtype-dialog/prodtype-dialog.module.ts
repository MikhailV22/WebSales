import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { ProdtypeDialogComponent } from '../prodtype-dialog/prodtype-dialog.component';

@NgModule({
  declarations: [
    ProdtypeDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  
  exports:[ProdtypeDialogComponent],
  providers: [
  ]
})
export class ProdtypeDialogModule { }
