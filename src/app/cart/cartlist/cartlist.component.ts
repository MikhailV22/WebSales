import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/CartService';
import { CartList } from '../../entity/CartList';
import { Cart } from '../../entity/Cart';
import { Whouse } from '../../entity/Whouse';


@Component({
  selector: 'app-cartlist',
  templateUrl: './cartlist.component.html',
  styleUrls: ['./cartlist.component.css','../../../assets/tm.css']
})
export class CartlistComponent implements OnInit {



//	results: CartList[];

	isLoading:Boolean=false;

	constructor(public cartService : CartService) { 
		cartService.refreshCart();
		// this.results = cartService.results;
	}

	ngOnInit() {
	}

	confirmWhouse(whouse:Whouse){
		this.cartService.selectedWhouse = whouse;
	}

  //   getResults(): void {
  //   	this.isLoading=true;
		// this.cartService.getResult()
		// .then(results => {
		// 	this.results = results;
	 //    	this.isLoading=false;
		// })
		// .catch(error=> {
		// 	console.log('error');
		// 	console.log(error);
		// 	this.isLoading=false});
        
        
  //   }

    editCart(item:CartList){
    	let cart:Cart;
    	cart = new Cart();
    	cart.id = item.id;
    	// cart.user_id = this.userService.user.id;
    	cart.whouse_id = item.whouse_id;
    	cart.trademark_id = item.trademark_id;
    	cart.prod_id = item.prod_id;
    	cart.amount = item.amount;
    	cart.price = item.price;

		this.cartService.edit(cart)
		.subscribe(()=>{
			// this.cartService.refreshCart();
			// console.log('deleted: '+id);
//			this.getResults();
			}
		)
	}


    delCart(id:number){
      // document.querySelector('#cart-banner').classList.add('afterRemove');
      // setTimeout(()=>{document.querySelector('#cart-banner').classList.remove('afterRemove')}, 300);


		this.cartService.delete(id)
		.subscribe(()=>{
			// this.cartService.refreshCart();
			// console.log('deleted: '+id);
//			this.getResults();
			}
		)
	}

    



}
