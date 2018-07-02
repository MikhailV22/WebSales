import { Component, OnInit, Input } from '@angular/core';
import { SearchParam } from '../entity/SearchParam';
import { SearchResult } from '../entity/SearchResult';
import { ApiResultService } from '../services/ApiResultService';
import { ActivatedRoute, ParamMap } from '@angular/router';
// import 'rxjs/add/operator/switchMap';
// import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-result-panel',
  templateUrl: './result-panel.component.html',
  styleUrls: ['./result-panel.component.css']
})
export class ResultPanelComponent implements OnInit {
	 
//	@Input() searchParam:SearchParam;

	selectedId:number;
	results: SearchResult[];

	isLoading:Boolean=false;

  constructor(public searchParam:SearchParam,
  	private apiResultService : ApiResultService,
  	private route: ActivatedRoute) { }


 	getTypesCount(typeId:Number){
// 		console.log('getModels: '+this.searchString);
		if (this.results){
	 		return this.results.filter((item,i,arr)=>{return item.prodtype_id===typeId})
	 			.length;
 		}else{
 			return 0;
 		}
 	}


  ngOnInit() {
 //  	if(this.searchParam.euro || this.searchParam.name){
 //  	if(this.searchParam.euro!=''||this.searchParam.name!=''){
	// 	this.getResults();
	// }
	// }

	// this.route.paramMap.subscribe(
 //     params => this.selectedId = +params.get('id')
 //     );



// 	this.route.paramMap
//     	.switchMap((params: ParamMap) =>
//         {
// //         	console.log(params.get('id'))
//     	    this.selectedId = +params.get('id');
// 	        return params.get('id');
//         })

//         .subscribe();


  }


    getResults(): void {
    	// console.log('getResults()');
    	// console.log(this.searchParam.euro);

    	this.isLoading=true;
//        this.apiResultService.getResults().then(results => this.results = results);
//        this.apiResultService.getResultsSlowly().then(results => this.results = results);

		// this.apiResultService.getResultByParam()
		// .then(results => {
		// 	this.results = results;
	 //    	this.isLoading=false;
		// })
		// .catch(error=> {
		// 	console.log('error');
		// 	console.log(error);
		// 	this.isLoading=false});
        
		this.apiResultService.getResultByParam2()
		.subscribe(
			results => {
				this.results = results;
		    	this.isLoading=false;
			},
			error=>{
				console.log(error);
		    	this.isLoading=false;
			});

    }

    clear(){
    	this.results=null;
    }



}
