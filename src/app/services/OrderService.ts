import { Injectable } from '@angular/core';
import { OrderList } from '../entity/OrderList';
import { Order } from '../entity/Order';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/UserService';
//import { SearchParam } from '../entity/SearchParam';
import { baseURL } from '../entity/API_path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderService {

    constructor(private http: HttpClient,
      private userService:UserService) {}


    getResult(): Observable<OrderList[]> {
      let url = baseURL+'/webresources/entity.orderview/'
       +this.userService.user.id;


      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

      return this.http.get(url,{headers: headers})
                 .pipe(map(response => {
  //                 console.log(response as GoodsResult[])
                   return response as OrderList[]
                 }));
//                 .catch(this.handleError);
    }      

    // private handleError(error: any): Promise<any> {
    //    console.error('An error occurred', error); // for demo purposes only
    //   return Promise.reject(error.message || error);
    // }


    add(order: Order): Observable<Order> {
//       console.log('OrderService.add');

        let url = baseURL+'/webresources/entity.order'
        let headers = new HttpHeaders(
          { 'Content-Type': 'application/json',
                'charset':'utf-8' })
        .append('Authorization', 'Bearer '+this.userService.user.token);

        order.user_id=this.userService.user.id;
        order.shipping_whouse_id = this.userService.user.default_whouse;
        // console.log(JSON.stringify(order));

        return this.http.post<Order>(url, 
              JSON.stringify(order),
              {headers: headers})
             .pipe(map((result) => {
         // console.log(JSON.stringify(result));
                return result;
             }));
    }


}