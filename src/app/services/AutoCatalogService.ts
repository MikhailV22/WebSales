import { Injectable } from '@angular/core';
import { SearchParam } from '../entity/SearchParam';
import { Marks } from '../entity/Marks';
import { Models } from '../entity/Models';
import { Generation } from '../entity/Generation';
import { Car } from '../entity/Car';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { UserService } from '../services/UserService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseURL } from '../entity/API_path';

@Injectable()
export class AutoCatalogService {
//    private baseULR = 'http://localhost:8080/';
//    private baseURL = document.location.protocol +"//"+ document.location.host.replace('4200','80')+'/';
//    private baseULR = 'https://autoglass-russia.ru/';

    constructor(private http: HttpClient,
      private userService: UserService,
      private searchParam:SearchParam) {
      // console.log('this.baseULR');
      // console.log(this.baseURL);
    }

    
    

nullIfEmpty(str:String){
  if (str==''){
    return 'NULL';
  }
  return str;
}


  // getResult(id: number): Observable<SearchResult> {
  //   let url = this.baseURL+'WebSalesAPI/webresources/entity.prod/'+id;
  //   let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

  //   // console.log('getResult');
  //   return this.http.get(url,{headers: headers})
  //              .map(response => response as SearchResult);
  // }    


  getResults(): Observable<Marks[]> {
    // console.log(this.searchParam.euro);
    // console.log(this.searchParam.name);
  //  let url = 'http://localhost:8080/WebSales/webresources/entity.carmarks/byname/'+searchParam.name;
    let url = baseURL+'/webresources/entity.carmarks/byname/NULL';
      // +this.nullIfEmpty(this.searchParam.name)+'/'
      // +this.searchParam.whouses+'/'
      // +this.nullIfEmpty(this.searchParam.euro);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});
  //        .append('Authorization', 'Bearer 1234');

    return this.http.get(url,{headers: headers})
               .pipe(
               map(response => response as Marks[])
               );

               // .toPromise()
               // .then(response => response as SearchResult[])
               // .catch(this.handleError);
  }      

  getModels(): Observable<Models[]> {
     // console.log("markId:"+markId);
    // console.log(this.searchParam.name);
  //  let url = 'http://localhost:8080/WebSales/webresources/entity.carmarks/byname/'+searchParam.name;
    let url = baseURL+'/webresources/entity.carmodels/byname/'
//       +this.nullIfEmpty(markId)+'/'
//       +markId+'/'
       +this.searchParam.selectedMark.id+'/'
       +'NULL/'
      // +this.nullIfEmpty(this.searchParam.euro);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});
  //        .append('Authorization', 'Bearer 1234');

    return this.http.get(url,{headers: headers})
               .pipe(map(response => response as Models[]));

               // .toPromise()
               // .then(response => response as SearchResult[])
               // .catch(this.handleError);
  }      


  getGenerations(): Observable<Generation[]> {
     // console.log("markId:"+markId);
    // console.log(this.searchParam.name);
  //  let url = 'http://localhost:8080/WebSales/webresources/entity.carmarks/byname/'+searchParam.name;
    let url = baseURL+'/webresources/entity.generation/generation/'
//       +this.nullIfEmpty(markId)+'/'
//       +modelId+'/'
       +this.searchParam.selectedModel.id+'/'
       +'1/'
      // +this.nullIfEmpty(this.searchParam.euro);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});
  //        .append('Authorization', 'Bearer 1234');

    return this.http.get(url,{headers: headers})
               .pipe(map(response => {
                 let arr = response as Generation[];
                 arr.unshift({id:-1,name:'Все поколения',years:''});
                 return response as Generation[]
               }));

               // .toPromise()
               // .then(response => response as SearchResult[])
               // .catch(this.handleError);
  }      

  getCars(): Observable<Car[]> {
     // console.log("markId:"+markId);
    // console.log(this.searchParam.name);
  //  let url = 'http://localhost:8080/WebSales/webresources/entity.carmarks/byname/'+searchParam.name;
    let url = baseURL+'/webresources/entity.autokatalog/cars/'
//      +this.nullIfEmpty(markId)+'/'
//       +carId+'/'
       +this.searchParam.selectedModel.id+'/'
       +this.searchParam.selectedGeneration.id+'/'
//       +'null/'
       +'null/'
      // +this.nullIfEmpty(this.searchParam.euro);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});
  //        .append('Authorization', 'Bearer 1234');

    return this.http.get(url,{headers: headers})
               .pipe(map(response => response as Car[]));

               // .toPromise()
               // .then(response => response as SearchResult[])
               // .catch(this.handleError);
  }      

  private handleError(error: any): Promise<any> {
     console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}