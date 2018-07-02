import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeliveryAddress } from '../entity/DeliveryAddress';
import { UserService } from '../services/UserService';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { baseURL } from '../entity/API_path';

@Injectable()
export class DeliveryAddressService {

    constructor(private http: HttpClient,
              public user_service:UserService) {
    }


  getByUser(): Observable<DeliveryAddress[]> {
//    console.log(baseURL);
    let url = baseURL+'/webresources/entity.deliveryaddress/byuser/'+this.user_service.user.id;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.user_service.user.token});

    return this.http.get<DeliveryAddress[]>(url,{headers: headers});
               // .toPromise()
               // .then(response => {
               //  return response;
               // })
               // .catch(this.handleError);
  }      


}