import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { WHOUSES } from '../entity/mock-result';
import { Whouse } from '../entity/Whouse';
import { SearchParam } from '../entity/SearchParam';
import { UserService } from '../services/UserService';
import {FormControl} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-whouse-dialog',
  templateUrl: './whouse-dialog.component.html',
  styleUrls: ['./whouse-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WhouseDialogComponent implements OnInit {

	@Output() onRefresh = new EventEmitter();

	whouses:Whouse[]=WHOUSES;


	//selectedValue:Whouse[];
	// toppings = new FormControl();



	onChange(){

		
		// this.toppings.value.map((item)=>{console.log(item)});
		 //console.log()


		if (!this.searchParam.selectedWhouse){
			return;
		}

		let result:string='_';
		//this.toppings.value
		//this.whouses
		this.searchParam.selectedWhouse
	//	.filter((item)=>{return item.selected})
		.map((item)=>{return item.id})
		.forEach((item,i,arr)=>{
			result += ','+item;

			if(item === 28){
//				result += ",210,240,250,260"; // External 
//				result += ",160,220,230,270"; // OEM

			}
			if(item === 18){
//				result += ",210,240,250,260"; // External 
//				result += ",160,220,230,270"; // OEM

			}
			if(item === 19){
				result += ",215"; // External 
//				result += ",160,220,230,270"; // OEM

			}
//			 console.log(item)
		});

		if(result!="_"){
			result += ",210,240,250,260"; // External for all whouses
			result += ",160,220,230,270"; // OEM for all whouses
		}

		result = result.replace('_,','').replace('_','');

	//	console.log(result);

		this.searchParam.whouses=result;
//		this.refresh();
	}


	refresh() {
//		console.log('this.onRefresh.emit()');
	    this.onRefresh.emit();
  	}    



  constructor(public searchParam:SearchParam,
  			public user_service:UserService) { 
  }

  ngOnInit() {
	// Устанавливаем склады клиента
	if (this.searchParam.selectedWhouse.length==0){
			this.whouses.forEach(
				(whouse)=>{
		//			console.log(whouse.name);
				if(this.user_service.user.whouses && this.user_service.user.whouses.split(",").indexOf(String(whouse.id))!=-1){
				 	this.searchParam.selectedWhouse.push(whouse);
				}
			}
			)
	}
	//console.log(this.searchParam.selectedWhouse);
	//this.user_service.user.whouses.split(",");
  	this.onChange();
  }

 //  change(){
	// let result:string='_';
	// this.whouses
	// .filter((item)=>{return item.selected})
	// .map((item)=>{return item.id})
	// .forEach((item,i,arr)=>{
	// 	result += ','+item;
	// 	if(item === 28){
	// 		result += ",210,240,250,260"; // External 
	// 		result += ",160,220,230,270"; // OEM

	// 	}
	// 	if(item === 18){
	// 		result += ",210,240,250,260"; // External 
	// 		result += ",160,220,230,270"; // OEM

	// 	}
	// 	if(item === 19){
	// 		result += ",210,215,240,250,260"; // External 
	// 		result += ",160,220,230,270"; // OEM

	// 	}
	// });

	// result = result.replace('_,','').replace('_','');

	// this.searchParam.whouses=result;
	// this.refresh();
 //  }

}
