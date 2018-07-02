import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderList } from '../entity/OrderList';
import { OrderService } from '../services/OrderService';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {

  results: OrderList[];

  isLoading:Boolean=false;

  constructor(
  	private orderService : OrderService) { }


  ngOnInit() {
    this.getResults();

  }


  getResults(): void {
    	// console.log('getResults()');
    	// console.log(this.searchParam.euro);

    	this.isLoading=true;
        
		this.orderService.getResult()
		.subscribe(
			results => {
				this.results = results;
		    	this.isLoading=false;
			},
			error=>{
				console.log(error);
		    	this.isLoading=false;
			});

  }

  clear(){
    	this.results=null;
  }



}
