import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import { Response } from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Log } from '../entity/Log';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { UserService } from '../services/UserService';
import { baseURL } from '../entity/API_path';

@Injectable()
export class LogService {
//    private baseULR = 'http://localhost:8080/';
//    private baseURL = document.location.protocol +"//"+ document.location.host.replace('4200','80')+'/';
//    private baseULR = document.location.protocol +"//"+ document.location.host+"/WebSales/webresources/";

//    private baseULR = 'https://autoglass-russia.ru/';
    


    constructor(private http: HttpClient,
    	private userService:UserService) {
    }



    add(action:string,source:string,commentary:string,prod_id:number,trademark_id:number,whouse_id:number ): Observable<boolean> {
    	// console.log('CartService.add');
      let log: Log = new Log();
      log.id=0;
      log.action=action;
      log.commentary=commentary;
      log.source=source;
      log.prod_id=prod_id;
      log.trademark_id=trademark_id;
      log.whouse_id=whouse_id;
      log.user_id=this.userService.user.id;
//      console.log("user_id: "+log.user_id);
        let url = baseURL+'/webresources/entity.weblog'
        let headers = new HttpHeaders(
        	{ 'Content-Type': 'application/json',
                'charset':'utf-8' })
        .append('Authorization', 'Bearer '+this.userService.user.token);


        return this.http.post(url, 
            JSON.stringify(log),
            {headers: headers})
             .pipe(map(() => {
//    	 console.log(JSON.stringify(log));
                return true;
             }));
    }

}