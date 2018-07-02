import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { ConfirmComponent } from './confirm/confirm.component';
import { CartlistComponent } from './cartlist/cartlist.component';




import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
//import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CartRoutingModule } from './cart-routing';
import { OrderService } from '../services/OrderService';


@NgModule({
  declarations: [
    ConfirmComponent,
    CartlistComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    CartRoutingModule,
    MatCheckboxModule
  ],
  
  exports:[ConfirmComponent,CartlistComponent],
  providers: [
    OrderService
  ]
})
export class CartModule { }
