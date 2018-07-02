import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SearchParam } from '../entity/SearchParam';
import { ResultPanelComponent } from '../result-panel/result-panel.component';


@Component({
  selector: 'search-by-code',
  templateUrl: './search-by-code.component.html',
  styleUrls: ['./search-by-code.component.css']
})
export class SearchByCodeComponent implements OnInit {
  selectedId:number;

	@ViewChild(ResultPanelComponent)
  	private resultPanelComponent: ResultPanelComponent;
  	message:string='';


//	searchParam:SearchParam= {euro:'4141', name:'a'};
	searchPanelVisible:boolean = true;
  

  onRefresh() {
//    console.log('onRefresh()');
    this.search();
  }


	constructor(private searchParam:SearchParam) {
		//this.searchParam = {euro:'4141', name:'a'};
	}

	ngOnInit() {
    this.searchParam.searchType="code";
    this.search();
	}


	onEnter(value: string) { 
		this.resultPanelComponent.getResults();
    }

  search(){
      // console.log(this.searchParam.whouses)
      // console.log(this.searchParam.prodtypes)
  		this.message="";
    	if (
    		(!this.searchParam.name || this.searchParam.name=='')&&
    		(!this.searchParam.euro || this.searchParam.euro=='')
    			){
    		this.message="Укажите параметры поиска";
    		return;
    	}
      if (!this.searchParam.whouses || this.searchParam.whouses==''){
        this.message="Укажите склады";
        return;
      }
      // if (!this.searchParam.prodtypes || this.searchParam.prodtypes==''){
      //   this.message="Укажите тип товара";
      //   return;
      // }
		this.resultPanelComponent.getResults();
    }

  clear(){
		this.searchParam.name="";
		this.searchParam.euro="";
    this.searchParam.year="";
    this.resultPanelComponent.clear();
  }


	searchPanelToggle() {
	    this.searchPanelVisible = !this.searchPanelVisible;
  	}



}
