import { SearchResult } from '../entity/SearchResult';
import { Whouse } from '../entity/Whouse';
import { ProdType } from '../entity/ProdType';

export const RESULTS: SearchResult[] = [
  // { id: 11, name: 'Mr. Nice',euro:'euro1',onStock:0,years:''},
  // { id: 12, name: 'Narco',euro:'euro2',onStock:0 ,years:''},
  // { id: 13, name: 'Bombasto',euro:'euro3',onStock:0 ,years:''},
  // { id: 14, name: 'Celeritas',euro:'euro4',onStock:0 ,years:''},
  // { id: 15, name: 'Magneta',euro:'euro5',onStock:0 ,years:''},
  // { id: 16, name: 'RubberMan',euro:'euro6',onStock:0 ,years:''},
  // { id: 17, name: 'Dynama',euro:'euro7',onStock:0 ,years:''},
  // { id: 18, name: 'Dr IQ',euro:'euro8',onStock:0 ,years:''},
  // { id: 19, name: 'Magma',euro:'euro9',onStock:0 ,years:''},
  // { id: 20, name: 'Tornado',euro:'euro10',onStock:0 ,years:''}
];


export const WHOUSES: Whouse[] = [
  { id: 28, name: 'Москва',real_name:'msk',isexternal:0,selected:true},
  { id: 19, name: 'Санкт-Петербург',real_name:'spb',isexternal:0,selected:true},
  { id: 18, name: 'Новосибирск',real_name:'nsk',isexternal:0,selected:true},

];


export const PRODTYPES: ProdType[] = [
  { id: 1, name: 'Лобовые',selected:true},
  { id: 4, name: 'Задние',selected:true},
  { id: 3, name: 'Боковые',selected:true},
  { id: 2, name: 'Молдинги',selected:false},
  { id: 5, name: 'Праймер/клей',selected:false},
  { id: 8, name: 'Датчики и т.п.',selected:false},
  { id: 9, name: 'Стеклоочистители',selected:false},

];