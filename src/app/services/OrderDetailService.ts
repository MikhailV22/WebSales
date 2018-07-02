
import { Injectable } from '@angular/core';
import { OrderDetail } from '../entity/OrderDetail';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/UserService';
//import { SearchParam } from '../entity/SearchParam';
import { baseURL } from '../entity/API_path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class OrderDetailService {

    constructor(private http: HttpClient,
      private userService:UserService) {}


    getResult(orignum:String): Observable<OrderDetail[]> {
      let url = baseURL+'/webresources/entity.orderdetailview/'
       +this.userService.user.id+"/"
       +orignum;


      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

      return this.http.get(url,{headers: headers})
                 .pipe(map(response => {
  //                 console.log(response as GoodsResult[])
                   return response as OrderDetail[]
                 }));
//                 .catch(this.handleError);
    }      

    // private handleError(error: any): Promise<any> {
    //    console.error('An error occurred', error); // for demo purposes only
    //   return Promise.reject(error.message || error);
    // }

}