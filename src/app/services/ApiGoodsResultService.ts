import { Injectable } from '@angular/core';
import { GoodsResult } from '../entity/GoodsResult';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/UserService';
import { SearchParam } from '../entity/SearchParam';
import { baseURL } from '../entity/API_path';

@Injectable()
export class ApiGoodsResultService {
//    private baseULR = 'http://localhost:8080/';
//    private baseURL = document.location.protocol +"//"+ document.location.host.replace('4200','80')+'/';
//    private baseULR = 'https://autoglass-russia.ru/';

    constructor(private http: HttpClient,
      private userService:UserService,
      private searchParam:SearchParam) {}


    getResultByParam(prodId: Number): Promise<GoodsResult[]> {
    //  let url = 'http://localhost:8080/WebSalesAPI/webresources/entity.prod/byname/'
      let url = baseURL+'/webresources/entity.goodsresult/byprodid/'
      +prodId+'/'
      +this.searchParam.whouses+'/'
      +this.userService.user.id;

//console.log('whouses.'+this.searchParam.whouses);

      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

      return this.http.get(url,{headers: headers})
                 .toPromise()
                 .then(response => {
  //                 console.log(response as GoodsResult[])
                   return response as GoodsResult[]
                 })
                 .catch(this.handleError);
    }      

    private handleError(error: any): Promise<any> {
       console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}