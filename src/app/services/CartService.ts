import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import { Response } from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../entity/Cart';
import { CartList } from '../entity/CartList';
import { Whouse } from '../entity/Whouse';
import { OrderList } from '../entity/OrderList';
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/map'
//import { User } from '../entity/User';
import { UserService } from '../services/UserService';
import { baseURL } from '../entity/API_path';

@Injectable()
export class CartService {
//    private baseULR = 'http://localhost:8080/';
//    private baseURL = document.location.protocol +"//"+ document.location.host.replace('4200','80')+'/';
//    private baseULR = document.location.protocol +"//"+ document.location.host+"/WebSales/webresources/";

//    private baseULR = 'https://autoglass-russia.ru/';
    
	results: CartList[];
    whouses:Whouse[];
    selectedWhouse:Whouse;

    amount_total:number = 0;
    price_total:number = 0;

    constructor(private http: HttpClient,
    	private userService:UserService) {
//    	this.refreshCart();
		//console.log('CartService');
    }



    add(cart: Cart): Observable<boolean> {
    	// console.log('CartService.add');

        let url = baseURL+'/webresources/entity.cart'
        let headers = new HttpHeaders(
        	{ 'Content-Type': 'application/json',
                'charset':'utf-8' })
        .append('Authorization', 'Bearer '+this.userService.user.token);

      document.querySelector('#cart-banner').classList.add('afterAdd');
      // setTimeout(()=>{document.querySelector('#cart-banner').classList.remove('afterAdd')}, 300);
      cart.user_id=this.userService.user.id;

        return this.http.post(url, 
            JSON.stringify(cart),
            {headers: headers})
//            .finally(() => {document.querySelector('#cart-banner').classList.remove('afterAdd')})
             .pipe(map(() => {
    	// console.log(JSON.stringify(cart));
    			this.refreshCart();
                setTimeout(()=>{document.querySelector('#cart-banner').classList.remove('afterAdd')}, 300);
//    			this.amount_total += cart.amount;
                return true;
             }));
    }

    edit(cart: Cart): Observable<boolean> {
    	 console.log('CartService.edit');
    	cart.user_id = this.userService.user.id;
        let url = baseURL+'/webresources/entity.cart'
        let headers = new HttpHeaders(
        	{ 'Content-Type': 'application/json',
                'charset':'utf-8' })
        .append('Authorization', 'Bearer '+this.userService.user.token);
        return this.http.put(url, 
            JSON.stringify(cart),
            {headers: headers})
             .pipe(map(() => {
    			// this.refreshCart();
				this.calcCart();
                return true;
             }));
    }

    delete(cartId: number): Observable<boolean> {
    	// console.log('CartService.add');
        let url = baseURL+'/webresources/entity.cart/'+cartId;
        let headers = new HttpHeaders(
        	{ 'Content-Type': 'application/json',
                'charset':'utf-8' })
        .append('Authorization', 'Bearer '+this.userService.user.token);

        document.querySelector('#cart-banner').classList.add('afterRemove');

        return this.http.delete(url, 
            {headers: headers})
             .pipe(map(() => {
    			this.refreshCart();
                setTimeout(()=>{document.querySelector('#cart-banner').classList.remove('afterRemove')}, 300);
                return true;
             }));
    }


	getResult(): Promise<boolean> {
//		console.log(baseURL);
	  let url = baseURL+'/webresources/entity.cartlist/byuser/'+this.userService.user.id;
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

	  return this.http.get<CartList[]>(url,{headers: headers})
	             .toPromise()
	             .then(response => {
					// this.amount_total = 0;
					// this.price_total = 0;
					// (response as CartList[]).forEach((val,index,array)=>{
					// 	this.amount_total += val.amount;
					// 	this.price_total += val.amount*val.price;
					// 	// console.log(val)
					// })

					this.results=response;
          console.log(response.length)
					// this.results=response as CartList[];
					this.calcCart();
	             	return true;
	             })
	             .catch(this.handleError);
	}      

	private handleError(error: any): Promise<any> {
	   console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}

	// Обновляет данные о корзине
	refreshCart(){
		this.getResult()
		.then(()=>{
            // если корзина не пуста, тогда обновляем список складов в корзине
            if(this.results.length>0){
                this.getWhousesList()
            }else{
                this.whouses = []
            }
        })
        .catch(this.handleError);;
        //this.getWhousesList().then();
	}

	// Подсчет итоговых сумм по корзине
	calcCart(){
		this.amount_total = 0;
		this.price_total = 0;
		this.results.forEach((val,index,array)=>{
			this.amount_total += Number(val.amount);
			this.price_total += val.amount*val.price;
			// console.log(val)
		})
	}

  // Возвращает список складов в корзине
  getWhousesList():Promise<boolean> {
    let url = baseURL+'/webresources/entity.whouses/incart/'+this.userService.user.id;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

    return this.http.get<Whouse[]>(url,{headers: headers})
               .toPromise()
               .then(response => {
                  this.whouses=response;
                   return true;
               })
               .catch(this.handleError);
  }   

  getListByWhouse(whouse_id: number):CartList[]{
      return this.results
          .filter((item)=>item.whouse_id===whouse_id);
  }


  // Подсчет сумм по складу whouseId
  getOrderInfo(whouseId:number):OrderList{
    let order = new OrderList();
    order.amount = 0;
    order.cost = 0;
    this.results
    .filter((item)=>item.whouse_id===whouseId)
    .forEach((val,index,array)=>{
      order.amount += Number(val.amount);
      order.cost += val.amount*val.price;
//       console.log(val.price)
    })
//    console.log(order);
    return order;
  }


}