import { Injectable } from '@angular/core';
import { User } from '../entity/User';


@Injectable()
export class UserService {
    
    user:User = new User();

    constructor() {
        this.user = JSON.parse(localStorage.getItem('currentUser'));

  //     this.user.id=1;
  //     this.user.login='admin';
  //     this.user.name='test';
  //     this.user.token='1234';
		 // console.log('UserService');
   //   console.log(JSON.parse(localStorage.getItem('currentUser')));
   //   console.log(this.user);
    }

    isLogin():Boolean{
     // console.log('UserService.isLogin');
      return this.user && this.user.token && this.user.token.length!=0;
    }


}