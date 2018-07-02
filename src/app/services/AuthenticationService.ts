import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { User } from '../entity/User';
import { UserService } from '../services/UserService';
// import 'rxjs/add/operator/map'
import { map } from 'rxjs/operators';
import { baseURL } from '../entity/API_path';

@Injectable()
export class AuthenticationService {
//    private baseULR = 'http://localhost:8080/';
//    private baseURL = document.location.protocol +"//"+ document.location.host.replace('4200','80')+'/';
//    private baseULR = 'https://autoglass-russia.ru/';
//    public token: string;

    // store the URL so we can redirect after logging in
    public redirectUrl:string;

    constructor(private http: HttpClient,
              public user_service:UserService) {
        // set token if saved in local storage
//        user_service.user = JSON.parse(localStorage.getItem('currentUser'));
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
//        this.token = currentUser && currentUser.token;
    }


//     login(username: string, password: string): Observable<User> {
//         this.logout();
//         let url = this.baseURL+'WebSalesAPI/webresources/entity.user/logon'
//         let headers = new HttpHeaders(
//             { 'Content-Type': 'application/json',
//                 'charset':'utf-8' });
// //        .append('Authorization', 'Bearer 1234');

//           //let headers = new HttpHeaders({ 'Authorization': 'Bearer 1234' });
//         return this.http.post(url, 
//             JSON.stringify({ name: username, password: password }),
//             {headers: headers})
//             .map((response: User) => {
//                         // console.log("login");
//                         // console.log(response);
//                         let user = response;
//                         // console.log(user);
//                         // this.connected_user.user=user;
//                          if(user && user.token){
// //                            localStorage.setItem('currentUser', JSON.stringify(user));
//                             return user;
//                          }else{
//                             return user;
//                          }

//                     }

//             );
            
//     }

    login(username: string, password: string): Observable<boolean> {
        this.logout();
        let url = baseURL+'/webresources/entity.user/logon'
        let headers = new HttpHeaders(
            { 'Content-Type': 'application/json',
                'charset':'utf-8' });
//        .append('Authorization', 'Bearer 1234');

          //let headers = new HttpHeaders({ 'Authorization': 'Bearer 1234' });
        return this.http.post(url, 
            JSON.stringify({ name: username, password: password }),
            {headers: headers})
        .pipe(
            map((response: User) => {
                        this.user_service.user=response;
                        if (this.user_service.isLogin()) {
                            localStorage.setItem('currentUser', JSON.stringify(this.user_service.user));
                            return true;
                         }else{
                            this.logout();
                            return false;
                         }

                    }

            )
            );
            
    }

    login_promise(username: string, password: string): Promise<boolean> {
        this.logout();
        let url ='http://localhost:8080/WebSalesAPI/webresources/entity.user/logon'
        let headers = new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' });
        return this.http.post(url, 
            JSON.stringify({ name: username, password: password }),
            {headers: headers})

            .toPromise()
             .then(response => {
                 let user = response as User;
                // store user and token in local storage to keep user logged in between page refreshes

                 console.log(user);
                 if(user.token){
                    localStorage.setItem('connectedUser', JSON.stringify(user));
                    return true;
                 }else{
                     return false;
                 }

             })
             .catch(error => {
                  console.log(error);
                 return false;});


        // return this.http.post(url, 
        //     JSON.stringify({ username: username, password: password }),
        //     {headers: headers})
        //     .map((response: Response) => {
        //         // login successful if there's a jwt token in the response
        //         console.log(response);
        //         return true;
        //     });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.user_service.user = null;
        localStorage.removeItem('currentUser');
    }


    check_token(): Observable<boolean> {

        if (this.user_service.user==null){
          return of(false);
          // return Observable.of(false);
        }


        let url = baseURL+'/webresources/entity.user/validateToken/'
        +this.user_service.user.token;
        let headers = new HttpHeaders(
            { 'Content-Type': 'application/json',
                'charset':'utf-8' })
        .append('Authorization', 'Bearer '+this.user_service.user.token);
    //let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

        return this.http.get(url,
            {headers: headers})
        .pipe(
            map((response: Number) => {
                        if (response==1) {
                            return true;
                         }else{
                            //this.logout();
                            throw Observable.throw("token off");  
                            //return false;
                         }

                    }

            )
            );
            
    }


}