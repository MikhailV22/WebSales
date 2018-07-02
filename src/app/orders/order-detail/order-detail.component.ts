import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { OrderList } from '../../entity/OrderList';
import { OrderDetail } from '../../entity/OrderDetail';
import { OrderDetailService } from '../../services/OrderDetailService';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css','../../../assets/tm.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailComponent implements OnInit {

  @Input() order:OrderList;	

  results: OrderDetail[];

  isLoading:Boolean=false;

  constructor(
  	private orderDetailService : OrderDetailService) { }


  ngOnInit() {
    this.getResults();
  }


  getResults(): void {
    	// console.log('getResults()');
    	// console.log(this.searchParam.euro);

    	this.isLoading=true;
        
		this.orderDetailService.getResult(this.order.orignum.replace("/","slash"))
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



}
