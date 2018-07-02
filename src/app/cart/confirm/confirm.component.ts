import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
//import { NgControl } from '@angular/forms';
import { CartService } from '../../services/CartService';
import { OrderService } from '../../services/OrderService';
import { Order } from '../../entity/Order';
import { DeliveryAddressService } from '../../services/DeliveryAddressService';
import { DeliveryAddress } from '../../entity/DeliveryAddress';
// import $ from 'jquery';
import { Cart } from '../../entity/Cart';


import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { CartList } from '../../entity/CartList';
// import { Cart } from '../../entity/Cart';
// import { Whouse } from '../../entity/Whouse';


//import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
//import {default as _rollupMoment} from 'moment';
//const moment = _rollupMoment || _moment;
const moment =  _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'DD.MM.YYYY',
    dateA11yLabel: 'DD.MM.YYYY',
    monthYearA11yLabel: 'DD.MM.YYYY',
  },
};

// export class DeliveryType {
//   id:number;
//   name:String;
// }

// export class PayType {
//   id:number;
//   name:String;
// }

export class SelectItem {
  id:number;
  name:String;
}

export class TransportCompany {
  
  // name:String="";
  // deliveryAddress:SelectItem=new SelectItem();
  // packType:SelectItem=new SelectItem();
  // insuranse:Boolean = false;
  constructor(
      public name:String,
      public deliveryAddress:SelectItem,
      public packType:SelectItem,
      public insuranse:Boolean){}

  // deliveryList:SelectItem[] = [
  //   {id:0,name:"до терминала ТК"},
  //   {id:1,name:"до адреса заказчика"}
  // ];
  // packList:SelectItem[] = [
  //   {id:0,name:"Нет"},
  //   {id:1,name:"Ящик"},
  //   {id:1,name:"Коробка"}
  // ];

}


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},  
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
//    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},    
  ],
})



export class ConfirmComponent implements OnInit {

  order : Order = new Order(); //хранит объект WEB_ORDER, если нет ID значит ордер не создан
  

//  transportCompany:TransportCompany = new TransportCompany();  

  deliveryAddress:DeliveryAddress[];
//  selectedDeliveryAddress:DeliveryAddress;
  deliveryCostForWindow:number = 199; // Стоимость доставки одного стекла

  //date = new FormControl(new Date());
  date = new FormControl();
  minDate = moment();
  //date = new FormControl(moment());
  //date = new FormControl(moment([2017, 0, 1]));
//  date = new FormControl(moment(new Date()).add(1,'days'));

//  deliveryTypes:DeliveryType[] = [
  deliveryTypes:SelectItem[] = [
    {id:0,name:"Резерв"},
    {id:1,name:"Доставка"},
    {id:2,name:"Самовывоз"},
  ];

//  selectedDeliveryType:SelectItem = this.deliveryTypes[0];

//  payTypes:PayType[] = [
  payTypes:SelectItem[] = [
    {id:1,name:"Наличная"},
    {id:2,name:"Безналичная"},
    {id:3,name:"Банковская карта"},
  ];

//  selectedPayType:SelectItem = this.payTypes[0];


  transportCompanyList:SelectItem[] = [
    {id:1,name:"Carglass"},
    {id:2,name:"Транспортная компания"}
  ];

//  selectedTransportCompany:SelectItem;


  deliveryList:SelectItem[] = [
    {id:0,name:"до терминала ТК"},
    {id:1,name:"до адреса заказчика"}
  ];
  packList:SelectItem[] = [
    {id:0,name:"Нет"},
    {id:1,name:"Ящик"},
    {id:1,name:"Коробка"}
  ];



  constructor(private fb: FormBuilder,
    public cartService : CartService,
    public deliveryAddressService:DeliveryAddressService,
    public orderService : OrderService) { 
    // устанавливаем дату отгрузки по умолцанию
    this.date.setValue(moment().add(cartService.selectedWhouse.delivery_time||1,'days'));
  }



  myform: FormGroup;

  ngOnInit() {

    // this.order.cost=1000;
    // this.order.orignum="W97/123123";
    // this.order.id=1;
    

    // поднимаем в начало страницы
    window.scrollTo(0, 0);

    // Заполняем адреса доставок
    this.deliveryAddressService.getByUser()
    .subscribe(
      (result)=>{
          this.deliveryAddress = result;
        }
      );

    //Удаляем Доставку из заказа, т.к. пока не знаем что выберет клиент
    this.delDelivery();



    this.myform = this.fb.group({
        selectedDeliveryType: [SelectItem, Validators.required ],
        selectedPayType:[SelectItem, Validators.required ],
        selectedDeliveryAddress:DeliveryAddress, 
        selectedTransportCompany:SelectItem,
        commentary:"",
        transportCompany: this.fb.group(new TransportCompany("",null,null,false))
    });
    // this.myform = new FormGroup({
    //     selectedDeliveryType:new FormControl(this.selectedDeliveryType),
    //     selectedPayType:new FormControl(this.selectedPayType),
    //     selectedDeliveryAddress:new FormControl(this.selectedDeliveryAddress),
    //     selectedTransportCompany:new FormControl(this.selectedTransportCompany),
    // });

    // this.myform.get('selectedTransportCompany').valueChanges.forEach(
    //     (value:SelectItem)=>this.setValidators()
    //   );

  }

  get selectedDeliveryType() { return this.myform.get('selectedDeliveryType'); }
  get selectedPayType() { return this.myform.get('selectedPayType'); }
  get selectedDeliveryAddress() { return this.myform.get('selectedDeliveryAddress'); }
  get selectedTransportCompany() { return this.myform.get('selectedTransportCompany'); }
  
    
  setValidators(){
      //Удаляем все валидаторы
      this.myform.get("selectedDeliveryAddress").clearValidators();
      this.myform.get("selectedTransportCompany").clearValidators();
      this.myform.get("transportCompany.name").clearValidators();
      this.myform.get("transportCompany.deliveryAddress").clearValidators();
      this.myform.get("transportCompany.packType").clearValidators();


    //Устанавливаем валидаторы

    if(this.myform.get("selectedDeliveryType").value.id===1){
      this.myform.get("selectedDeliveryAddress").setValidators(Validators.required);
      this.myform.get("selectedTransportCompany").setValidators(Validators.required);
      //console.log("selectedTransportCompany.setValidators");
    }else{
      // this.myform.get("selectedDeliveryAddress").clearValidators();
      // this.myform.get("selectedTransportCompany").clearValidators();
    }



    if(this.myform.get("selectedTransportCompany").value){
      if (this.myform.get("selectedTransportCompany").value.id===2){
        //console.log("this.myform.get(transportCompany.name).setValidators()");
        this.myform.get("transportCompany.name").setValidators([Validators.required]);
        this.myform.get("transportCompany.deliveryAddress").setValidators([Validators.required]);
        this.myform.get("transportCompany.packType").setValidators([Validators.required]);
      }else{
        //console.log("this.myform.get(transportCompany.name).clearValidators()");
        // this.myform.get("transportCompany.name").clearValidators();
        // this.myform.get("transportCompany.name").reset();
        // this.myform.get("transportCompany.deliveryAddress").clearValidators();
        // this.myform.get("transportCompany.deliveryAddress").reset();
        // this.myform.get("transportCompany.packType").clearValidators();
        // this.myform.get("transportCompany.packType").reset();
      }
    }
    this.myform.get("selectedDeliveryAddress").updateValueAndValidity();
    this.myform.get("selectedTransportCompany").updateValueAndValidity();
    this.myform.get("transportCompany.name").updateValueAndValidity();
    this.myform.get("transportCompany.deliveryAddress").updateValueAndValidity();
    this.myform.get("transportCompany.packType").updateValueAndValidity();
    this.myform.get("selectedDeliveryAddress").markAsTouched();
  }

  onSubmit(){
    //this.myform.get("selectedDeliveryType").hasError;

    // this.myform.get("selectedDeliveryType").markAsTouched();
    // this.myform.get("selectedPayType").markAsTouched();

    // if (this.myform.get("selectedDeliveryAddress").invalid){
    //   this.myform.get("selectedDeliveryAddress").setErrors({required:true})
    // }
    // this.myform.get("selectedDeliveryAddress").markAsTouched();

//    alert("submit"+this.myform.invalid);

    

    this.order.cost = this.cartService.getOrderInfo(this.cartService.selectedWhouse.id).cost;
    this.order.amount = this.cartService.getOrderInfo(this.cartService.selectedWhouse.id).amount;
    //order.whouse_id = this.cartService.selectedWhouse.id;
    this.order.delivery_type = this.myform.get("selectedDeliveryType").value.id;
    this.order.transportcompany = this.myform.get("selectedTransportCompany").value.id;
    this.order.delivery_date=this.date.value;
    this.order.regdate = new Date();
    this.order.whouse_id = this.cartService.selectedWhouse.id;
    this.order.commentary = encodeURIComponent(this.myform.get("commentary").value);
//    this.order.commentary = this.myform.get("commentary").value;

//    this.order.id = 100;
  



    this.orderService.add(this.order).subscribe(
      (result)=>{
          this.order=result;
          // console.log(JSON.stringify(this.order));
          this.cartService.refreshCart();
      }
      );

  }


  selectedTransportCompanyChange(event){
    console.log("selectedTransportCompanyChange");
    this.setValidators();
  }

  deliveryTypeChange(event){
//    console.log(this.myform.get("selectedDeliveryType").value);

//    console.log(event.value);
    this.minDate = moment().add(this.cartService.selectedWhouse.delivery_time||0,'days');
    this.setValidators();
    if(event.value.id===1){
       // this.myform.get("selectedDeliveryAddress").setValidators(Validators.required);
       // this.myform.get("selectedTransportCompany").setValidators(Validators.required);



      this.addDelivery();
    }else{
       // this.myform.get("selectedDeliveryAddress").clearValidators();
       // this.myform.get("selectedDeliveryAddress").reset();
       // this.myform.get("selectedTransportCompany").clearValidators();
       // this.myform.get("selectedTransportCompany").reset();
       // this.myform.get("transportCompany.name").clearValidators();
       // this.myform.get("transportCompany.name").reset();
       
      // alert(this.myform.get("selectedDeliveryAddress").validator);
      this.delDelivery();
    }
    // if(event.value.id===2){
    //   this.minDate = moment();
    // }else{
    //   this.minDate = moment().add(this.cartService.selectedWhouse.delivery_time||0,'days');
    // }

  }


  // Возвращает кол-во стекол в корзине на текущем складе
  getWindowsCount(){
    let count = 0;
    this.cartService.getListByWhouse(this.cartService.selectedWhouse.id)
    .filter((item)=>
      [1,3,4,7].indexOf(item.prodtype_id)>-1
    )
    .forEach((item,index,array)=>{
      count+=item.amount;
    });
    return count;
    

    // this.results.forEach((val,index,array)=>{
    //   this.amount_total += Number(val.amount);
    //   this.price_total += val.amount*val.price;
    // })



  }

  getDeliveryCost():number{
    return this.deliveryCostForWindow*this.getWindowsCount();
  }



  addDelivery(){
    let cart:Cart;
    cart = new Cart();
    cart.id = 0;
    cart.whouse_id = this.cartService.selectedWhouse.id;
    cart.trademark_id = 1001;
    cart.prod_id = -70;
    cart.amount = 1;
    cart.price = this.getDeliveryCost();

    this.cartService.add(cart)
    .subscribe();
  }


  delDelivery(){
    this.cartService.getListByWhouse(this.cartService.selectedWhouse.id)
    .filter((item)=>
      item.prod_id===-70
    )
    .forEach((item,index,array)=>{
       //console.log('deleted: '+item.id+'    '+item.prod_id);
       this.cartService.delete(item.id)
         .subscribe();
    });
 }




}
