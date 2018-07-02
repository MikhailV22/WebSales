import { Injectable } from '@angular/core';
import { Marks } from '../entity/Marks';
import { Models } from '../entity/Models';
import { Generation } from '../entity/Generation';
import { Car } from '../entity/Car';
import { Whouse } from '../entity/Whouse';
import { ProdType } from '../entity/ProdType';


@Injectable()
export class SearchParam {
  name:string='';
  euro:string='';
  year:string='';

  whouses:string='';
  selectedWhouse:Whouse[]=[];

  prodtypes:string='';
  selectedProdType:ProdType[]=[];

  searchType:string='code';

  selectedMark:Marks;
  selectedModel:Models;
  selectedGeneration:Generation;
  selectedCar:Car;

  constructor() {
    this.clear();
  }

  clear(){
    this.name='';
    this.euro='';
    this.year='';
    this.selectedMark = new Marks();
    this.selectedMark.id=0;
    this.selectedMark.name='';
    this.selectedModel = new Models();
    this.selectedModel.id=0;
    this.selectedModel.name='';
    this.selectedGeneration = new Generation();
    this.selectedGeneration.id=0;
    this.selectedGeneration.name='';
    this.selectedGeneration.years='';
    this.selectedCar = new Car();
    this.selectedCar.id=0;
    this.selectedCar.fullName='';

  }	




}
