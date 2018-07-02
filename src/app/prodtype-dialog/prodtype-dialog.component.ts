import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { PRODTYPES } from '../entity/mock-result';
import { ProdType } from '../entity/ProdType';
import { SearchParam } from '../entity/SearchParam';

@Component({
  selector: 'app-prodtype-dialog',
  templateUrl: './prodtype-dialog.component.html',
  styleUrls: ['./prodtype-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProdtypeDialogComponent implements OnInit {
	prodtypes:ProdType[]=PRODTYPES;
//	selectedValue:ProdType[];

	@Output() onRefresh = new EventEmitter();



  onChange(){
//  	 console.log(value);
//  	this.isMsk = value;
	if (!this.searchParam.selectedProdType){
		return;
	}
	let result:string='_';
	//this.prodtypes
	this.searchParam.selectedProdType
	//.filter((item)=>{return item.selected})
	.map((item)=>{return item.id})
	.forEach((item,i,arr)=>{
		result += ','+item;
		if(item === 3){
			result += ",7"; // BOK
		}
	});

	result = result.replace('_,','').replace('_','');

	this.searchParam.prodtypes=result;
	this.refresh();
	// console.log(result)
  }



	refresh() {
//		console.log('this.onRefresh.emit()');
	    this.onRefresh.emit();
  	}    



  constructor(public searchParam:SearchParam) { }

  ngOnInit() {
  	//this.change();

	// this.prodtypes
	// .filter((item)=>{return item.selected})
	// .map((item)=>{return item.id})
	// .forEach((item,i,arr)=>{
	// 	result += ','+item;
	// 	if(item === 3){
	// 		result += ",7"; // BOK
	// 	}
	// });

	//this.searchParam.selectedProdType = this.prodtypes.filter((item)=>{return item.selected});
  	this.onChange();




  }

  change(){
//  	 console.log(value);
//  	this.isMsk = value;
	let result:string='_';
	this.prodtypes
	.filter((item)=>{return item.selected})
	.map((item)=>{return item.id})
	.forEach((item,i,arr)=>{
		result += ','+item;
		if(item === 3){
			result += ",7"; // BOK
		}
	});

	result = result.replace('_,','').replace('_','');

	this.searchParam.prodtypes=result;
	this.refresh();
	// console.log(result)
  }


}
