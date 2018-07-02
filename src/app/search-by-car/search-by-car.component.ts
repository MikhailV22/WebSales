import { Component, OnInit, ViewEncapsulation,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SearchParam } from '../entity/SearchParam';
import { ResultPanelComponent } from '../result-panel/result-panel.component';
import { AutoCatalogService } from '../services/AutoCatalogService';
import { Marks } from '../entity/Marks';
import { Models } from '../entity/Models';
import { Generation } from '../entity/Generation';
import { Car } from '../entity/Car';
import $ from 'jquery';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-search-by-car',
  templateUrl: './search-by-car.component.html',
  styleUrls: ['./search-by-car.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchByCarComponent implements OnInit {

	// @ViewChild('scrollMe') private myScrollContainer: ElementRef;

	@ViewChild(ResultPanelComponent)
  	private resultPanelComponent: ResultPanelComponent;

  	marksVisible:boolean;
  	showMarks(){
  		this.searchString='';
  		this.marksVisible = ! this.marksVisible;
  	}

  	modelsVisible:boolean;
  	showModels(){
  		this.searchString='';
  		this.modelsVisible = ! this.modelsVisible;
  	}

  	generationsVisible:boolean;
  	showGenerations(){
  		this.generationsVisible = ! this.generationsVisible;
  	}

  	carsVisible:boolean;
  	showCars(){
  		this.carsVisible = ! this.carsVisible;
  	}

  	marks:Marks[];
  	models:Models[];
  	generations:Generation[];
  	cars:Car[];

  	searchString:string='a';
  	// selectedMark:Marks;
  	// selectedModel:Models;
  	// selectedGeneration:Generation;
  	// selectedCar:Car;

  	message:string='';

	// scrollToBottom(): void {
 //        try {
 //            // this.myScrollContainer.nativeElement.scrollTop = 1000;
 //            this.myScrollContainer.nativeElement.scrollIntoView(true);
 //        } catch(err) { }                 
 //    }

  onRefresh() {
    console.log('onRefresh()');
    this.search();
  }


 	getMarks(){
// 		console.log('getMarks: '+this.searchString);
		if(this.marks){
 			return this.marks.filter((item,i,arr)=>{return item.name.toUpperCase().includes(this.searchString.toUpperCase())});
 		}else{
 			return [];
 		}
 		// this.marks.filter((item,i,arr)=>{return item.name.toUpperCase().includes(this.searchString.toUpperCase())})
 		// 	.forEach((item,i,arr)=>{console.log(item.name);})

 		// return this.marks.filter((item)=>{true});
// 		return this.marks.filter((item)=>{item.name.toUpperCase().includes(this.searchString.toUpperCase())});
//		return this.items.filter(item => item.name.toUpperCase().includes(this.searchString.toUpperCase()));
 	}

 	getModels(){
// 		console.log('getModels: '+this.searchString);
		if (this.models){
	 		return this.models.filter((item,i,arr)=>{return item.name.toUpperCase().includes(this.searchString.toUpperCase())});
 		}else{
 			return this.models;
 		}
 	}

  constructor(public searchParam:SearchParam,
  		private autoCatalogService:AutoCatalogService
  	) { }

  ngOnInit() {
    this.searchParam.searchType="car";

    // Обновляем список марок
    this.autoCatalogService.getResults()
    .subscribe(
			results => {
				this.marks = results;
			},
			error=>{console.log(error);}
    );



    // Обновляем список моделей
	if (this.searchParam.selectedModel){

		this.autoCatalogService.getModels().subscribe(
			results => {
				this.models = results;
			},
			error=>{console.log(error);}
		);
	}


    // Обновляем список поколений
	if (this.searchParam.selectedGeneration){
		this.autoCatalogService.getGenerations().subscribe(
			results => {
				this.generations = results;
			},
			error=>{console.log(error);}

		);
	}


    // Обновляем список автомобилей
	if (this.searchParam.selectedCar){
		this.autoCatalogService.getCars().subscribe(
			results => {
				this.cars = results;
			},
			error=>{console.log(error);}

		);
	}



	if (this.searchParam.selectedCar){
		this.search();
//			this.hideCarPanel();
	}
	

  }


	setMark(item:Marks){
		this.searchParam.selectedMark=item;
		this.clearModel();
		// console.log(item);
		this.autoCatalogService.getModels().subscribe(
			results => {
				this.models = results;
				// console.log(results);
		    	// this.isLoading=false;
			},
			error=>{
				console.log(error);
		    	// this.isLoading=false;
			}

		);
	}

	clearModel(){
		this.setModel({id:0,name:'',markId:0,onStock:0});
		this.clearGeneration();
		this.clearCar();
	}

	setModel(item:Models){
		this.searchParam.selectedModel=item;

		if(this.searchParam.selectedModel.id!=0){
		this.autoCatalogService.getGenerations().subscribe(
			results => {
				this.generations = results;
				//this.searchParam.selectedGeneration=this.generations[0];
				this.setGeneration(this.generations[0]);
				 // console.log(results);
		    	// this.isLoading=false;
			},
			error=>{
				console.log(error);
		    	// this.isLoading=false;
			}

		);
		}
	}

	clearGeneration(){
		this.setGeneration({id:0,name:'',years:''});
	}

	setGeneration(item:Generation){
		this.searchParam.selectedGeneration=item;
		if(this.searchParam.selectedGeneration.id!=0){
		this.autoCatalogService.getCars().subscribe(
			results => {
				this.cars = results;
				if(this.cars.length==1){
					this.setCar(this.cars[0]);
				}else{
					this.clearCar();
				}
//				 console.log(results);
		    	// this.isLoading=false;
			},
			error=>{
				console.log(error);
		    	// this.isLoading=false;
			}

		);
		}
	}	

	clearCar(){
		this.searchParam.selectedCar.id=0;
		this.searchParam.selectedCar.fullName='';
		this.setCar(this.searchParam.selectedCar);
	}

	setCar(item:Car){
		this.searchParam.selectedCar=item;
		this.search();
//		this.hideCarPanel();
	}	

	showCarPanel(){
		$('#select-car-panel').show(500);
	}

	hideCarPanel(){
		$('#select-car-panel').hide(500);
	}

  search(){
      // console.log(this.searchParam.selectedCar.fullName)
  		// this.message="";
    	// if (
    	// 	(!this.searchParam.name || this.searchParam.name=='')&&
    	// 	(!this.searchParam.euro || this.searchParam.euro=='')
    	// 		){
    	// 	this.message="Укажите параметры поиска";
    	// 	return;
    	// }
		this.message="";
		// if (!this.searchParam.prodtypes || this.searchParam.prodtypes==''){
		// 	this.message="Укажите тип товара";
		// 	return;
		// }
		if (!this.searchParam.whouses || this.searchParam.whouses==''){
			this.message="Укажите склады";
			return;
		}

	    	
		if (!this.searchParam.selectedCar){
			this.message="Укажите автомобиль";
			return;
		}

		if (!this.searchParam.selectedCar.id){
			this.message="Укажите автомобиль";
			return;
		}

		this.resultPanelComponent.getResults();
  }


}

