import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
//import {FormControl} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { WhouseDialogComponent } from '../whouse-dialog/whouse-dialog.component';
import { UserService } from '../services/UserService';

@NgModule({
  declarations: [
    WhouseDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    //FormControl,
    ReactiveFormsModule

  ],
  
  exports:[WhouseDialogComponent],
  providers: [
    UserService
  ]
})
export class WhouseDialogModule { }
