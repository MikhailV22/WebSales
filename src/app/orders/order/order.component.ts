import { Component, OnInit, ViewEncapsulation, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { OrderList } from '../../entity/OrderList';
import { UsersRequest } from '../../entity/UsersRequest';
import { SchetDialogComponent } from '../schet-dialog/schet-dialog.component';
import { UserService } from '../../services/UserService';
import { UsersRequestService } from '../../services/UsersRequestService';


// import { OrderService } from '../../services/OrderService';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {

  @Input() order:OrderList;	
  showDetailPanel:Boolean=false;

  constructor(public dialog: MatDialog,
            private userService:UserService,
            private usersRequestService : UsersRequestService,) { }

  ngOnInit() {
  }


  detailPanelToggle() {
        this.showDetailPanel = !this.showDetailPanel;
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(SchetDialogComponent, {
      width: '360px',
      data: { email: this.userService.user.emailSchet }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed '+result);
      // console.log(result);
      if (result){
        this.addRequest(result);
      }
      // this.animal = result;
    });
  }


    addRequest(email:string){

//      console.log(item);
      let item:UsersRequest;
      item = new UsersRequest();
      item.id = 0;
      item.userId = this.userService.user.id;
      item.email = email;
      item.orignum = this.order.orignum;
      item.regdate = new Date();
      item.de = item.regdate;
      item.ds = item.regdate;



      this.usersRequestService.add(item)
      .subscribe( result => {
        // console.log('usersRequest added');

                  // this.fetchBooks();    
               //                      this.reset();   
                 //        this.bookName = book.name;               
       });

    }


}
