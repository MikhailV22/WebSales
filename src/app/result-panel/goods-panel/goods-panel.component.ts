import { Component, OnInit, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { GoodsResult } from '../../entity/GoodsResult';
import { Cart } from '../../entity/Cart';
import { SearchResult } from '../../entity/SearchResult';
import { ApiGoodsResultService } from '../../services/ApiGoodsResultService';
import { CartService } from '../../services/CartService';
import { UserService } from '../../services/UserService';
import {MatIconModule} from '@angular/material/icon';
import { LogService } from '../../services/LogService';
import { SearchParam } from '../../entity/SearchParam';


@Component({
  selector: 'app-goods-panel',
  templateUrl: './goods-panel.component.html',
  styleUrls: ['./goods-panel.component.css']
})
export class GoodsPanelComponent implements OnInit {

	@Input() searchResult:SearchResult;

	isLoading:Boolean=false;
	results: GoodsResult[];
	
	@Output() onVoted = new EventEmitter<boolean>();


  constructor(private apiGoodsResultService : ApiGoodsResultService,
  				private cartService : CartService,
  				private  userService : UserService,
          public searchParam:SearchParam,
          private logService: LogService) { }

  ngOnInit() {
	this.getResults();
  }


    getResults(): void {
//    	console.log('GoodsPanelComponent.getResults()');
    	this.isLoading=true;
//        this.apiResultService.getResults().then(results => this.results = results);
//        this.apiResultService.getResultsSlowly().then(results => this.results = results);
		this.apiGoodsResultService.getResultByParam(
			this.searchResult.id)
		.then(results => {
			this.results = results;
	    	this.isLoading=false;
		})
		.catch(error=> {
      console.log('error');
      this.isLoading=false;
    });
        
        
    }

    addCart(item:GoodsResult){

      // document.querySelector('#cart-banner').classList.add('afterAdd');
      // setTimeout(()=>{document.querySelector('#cart-banner').classList.remove('afterAdd')}, 300);
            


      


    	console.log(item);
    	let cart:Cart;
    	cart = new Cart();
    	cart.id = 0;
    	cart.user_id = this.userService.user.id;
    	cart.whouse_id = item.whouse_id;
    	cart.trademark_id = item.trademark_id;
    	cart.prod_id = item.prod_id;
    	cart.amount = item.amountNeed;
    	cart.price = item.price;
    	this.cartService.add(cart)
    	.subscribe( result => {
//    		console.log('111');
			            // this.fetchBooks();		
               //                      this.reset();   
		             //        this.bookName = book.name;						   
			 });

    }

	vote(agreed: boolean) {
	    this.onVoted.emit(agreed);
  	}    

  showPrice(event,item:GoodsResult){
    // var target = event.currentTarget;
    // var pElement = target;
    // var pclassAttr = pElement.attributes.class;
    // console.log(pclassAttr);
    // console.log(event.currentTarget.innerHTML);
    // console.log('showPrice');
    event.currentTarget.classList.remove('button')
    if(item.price){
      event.currentTarget.innerHTML=item.price.toLocaleString()+' p.';
    }else{
      event.currentTarget.innerHTML='---';
    }
    // добавляем событие в лог
    this.logService.add(
      "showPrice",// action
      this.searchParam.searchType,// source
      "price="+item.price,// commentary
      item.prod_id,// prod_id
      item.trademark_id,// trademark_id
      item.whouse_id// whouse_id
      )
    .subscribe();
  }


}
