import { Injectable } from '@angular/core';
import { SearchParam } from '../entity/SearchParam';
import { SearchResult } from '../entity/SearchResult';
import { File } from '../entity/File';
import { RESULTS } from '../entity/mock-result';
import { baseURL } from '../entity/API_path';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { UserService } from '../services/UserService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable()
export class ApiResultService {
//    private baseULR = 'http://localhost:8080/';
//    private baseURL = document.location.protocol +"//"+ document.location.host.replace('4200','80')+'/';
//    private baseULR = 'https://autoglass-russia.ru/';

    constructor(private http: HttpClient,
      private userService: UserService,
      private searchParam:SearchParam) {
      // console.log('this.baseULR');
      // console.log(this.baseURL);
    }

    getResults(): Promise<SearchResult[]> {
        return Promise.resolve(RESULTS);
    }
    
    getResultsSlowly(): Promise<SearchResult[]> {      
      return new Promise(resolve => {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(this.getResults()), 2000);
      });
    } 
    
    
  getResult_bak(id: number): Promise<SearchResult> {
    return this.getResults()
               .then(results => results.find(result => result.id === id));
  }    

  getResultByParam_bak(searchParam: SearchParam): Promise<SearchResult[]> {

     return this.getResults()
                .then(results => results.filter(result => result.name.toUpperCase().indexOf(searchParam.name.toUpperCase())!=-1));
  }

nullIfEmpty(str:String){
  if (str==''){
    return 'null';
  }
  return str;
}

valIfEmpty(str:String,val:String){
  if (str==''){
    return val;
  }
  if (str==null){
    return val;
  }
  return str;
}

  getResult(id: number): Observable<SearchResult> {
    let url = baseURL+'/webresources/entity.prod/'+id;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

    // console.log('getResult');
    return this.http.get<SearchResult>(url,{headers: headers});
    // return this.http.get(url,{headers: headers})
    //                .map(response => response as SearchResult);
  }    

  getResult_Promise(id: number): Promise<SearchResult> {
    let url = baseURL+'/webresources/entity.prod/'+id;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

    console.log('getResult');
    return this.http.get(url,{headers: headers})
               .toPromise()
               .then(response => response as SearchResult[])
               .catch(this.handleError);
  }    

  getResultByParam(): Promise<SearchResult[]> {
    // console.log(this.searchParam.euro);
    // console.log(this.searchParam.name);
  //  let url = 'http://localhost:8080/WebSales/webresources/entity.carmarks/byname/'+searchParam.name;
    let url = baseURL+'/webresources/entity.prod/byname/'
      +this.nullIfEmpty(this.searchParam.name)
      +'/'+this.nullIfEmpty(this.searchParam.euro);

    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});
  //        .append('Authorization', 'Bearer 1234');


    return this.http.get(url,{headers: headers})
               .toPromise()
               .then(response => response as SearchResult[])
               .catch(this.handleError);
  }      


  getResultByParam2(): Observable<SearchResult[]> {
    // console.log(this.searchParam.euro);
    // console.log(this.searchParam.name);
  //  let url = 'http://localhost:8080/WebSales/webresources/entity.carmarks/byname/'+searchParam.name;

  let url:string;
  let headers:HttpHeaders;
  if (this.searchParam.searchType=='code'){
    url = baseURL+'/webresources/entity.prod/byname/'
      +this.nullIfEmpty(this.searchParam.name)+'/'
      +this.searchParam.whouses+'/'
      +this.nullIfEmpty(this.searchParam.prodtypes)+'/'
      +this.valIfEmpty(this.searchParam.year,'0')+'/'
      +this.nullIfEmpty(this.searchParam.euro);

    headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});
  }
  if (this.searchParam.searchType=='car'){
    url = baseURL+'/webresources/entity.prod/bycar/'
      +this.searchParam.selectedCar.id+'/'
      +this.searchParam.whouses+'/'
      +this.nullIfEmpty(this.searchParam.prodtypes)+'/';

    headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});
    
  }
  //   let url = this.baseURL+'/webresources/entity.prod/byname/'
  //     +this.nullIfEmpty(this.searchParam.name)+'/'
  //     +this.searchParam.whouses+'/'
  //     +this.nullIfEmpty(this.searchParam.euro);

  //   let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});
  // //        .append('Authorization', 'Bearer 1234');

    return this.http.get<SearchResult[]>(url,{headers: headers});
    // return this.http.get(url,{headers: headers})
    //            .map(response => response as SearchResult[]);

               // .toPromise()
               // .then(response => response as SearchResult[])
               // .catch(this.handleError);
  }      


  private handleError(error: any): Promise<any> {
     console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getImages(euro: String): Observable<File[]> {
    let url = baseURL+'/webresources/entity.file/pictures/'+euro;
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+this.userService.user.token});

    // console.log('getResult');
    return this.http.get<File[]>(url,{headers: headers});
    // return this.http.get(url,{headers: headers})
    //            .map(response => response as File[]);
  }    


}