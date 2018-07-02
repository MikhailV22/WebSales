import { Injectable } from '@angular/core';
import { UsersRequest } from '../entity/UsersRequest';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/UserService';
//import { SearchParam } from '../entity/SearchParam';
import { baseURL } from '../entity/API_path';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersRequestService {

    constructor(private http: HttpClient,
      private userService:UserService) {}



    add(item: UsersRequest): Observable<UsersRequest> {
       // console.log('UsersRequestService.add');

        let url = baseURL+'/webresources/entity.webusersrequest'
        let headers = new HttpHeaders(
          { 'Content-Type': 'application/json',
                'charset':'utf-8' })
        .append('Authorization', 'Bearer '+this.userService.user.token);

        // item.user_id=this.userService.user.id;
        item.orignum = encodeURIComponent(item.orignum);
        // console.log(JSON.stringify(order));

        return this.http.post<UsersRequest>(url, 
              JSON.stringify(item),
              {headers: headers})
             .pipe(map((result) => {
          // console.log(JSON.stringify(result));
                return result;
             }));
    }


}