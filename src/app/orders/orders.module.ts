import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { OrdersComponent } from './orders.component';

import { OrderService } from '../services/OrderService';
import { OrderDetailService } from '../services/OrderDetailService';
import { UsersRequestService } from '../services/UsersRequestService';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { OrderComponent } from './order/order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SchetDialogComponent } from './schet-dialog/schet-dialog.component';

//import { WhouseDialogComponent } from '../whouse-dialog/whouse-dialog.component';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderComponent,
    OrderDetailComponent,
    SchetDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule

  ],
  entryComponents: [
    SchetDialogComponent
  ],
  
  exports:[OrdersComponent],
  providers: [
    OrderService,
    OrderDetailService,
    UsersRequestService
  ]
})
export class OrdersModule { }
