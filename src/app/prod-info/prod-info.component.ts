import { Component, OnInit, HostBinding } from '@angular/core';

 import { Observable } from 'rxjs';
// import 'rxjs/add/operator/switchMap';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SearchResult } from '../entity/SearchResult';
import { ApiResultService } from '../services/ApiResultService';


@Component({
  selector: 'app-prod-info',
  templateUrl: './prod-info.component.html',
  styleUrls: ['./prod-info.component.css']
})
export class ProdInfoComponent implements OnInit {
	searchResult:SearchResult;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiResultService : ApiResultService) { }

  ngOnInit() {

  	// this.route.paramMap.subscribe(
  	// 		(params: ParamMap)=>{
  	// 			let id:number = parseInt(params.get('id'));

			//   	console.log(params.get('id'));
			//   	this.apiResultService.getResult(id).then(
			//   		res=>{
			//   			this.searchResult=res;
			//   		});
  	// 	}
  	// 	)



	this.route.paramMap
  .pipe(
      switchMap((params: ParamMap) =>
        {
        	// console.log(params.get('id'))

        	return this.apiResultService.getResult(parseInt(params.get('id')));
        	//return params.get('id')


        })
)
      .subscribe(res=>{
      	this.searchResult = res;
      	// console.log(res)
      });


// this.hero$ = this.route.paramMap
//       .switchMap((params: ParamMap) =>
//         this.service.getHero(params.get('id')));  	
  }


gotoList(searchResult: SearchResult) {
  let id = searchResult ? searchResult.id : null;
  // Pass along the hero id if available
  // so that the HeroList component can select that hero.
  // Include a junk 'foo' property for fun.
  //this.router.navigate(['/search-by-code', { id: id, foo: 'foo' }]);
  this.router.navigate(['/search-by-code', { id: id}]);
}  

}
