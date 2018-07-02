import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/AuthenticationService';
import { User } from '../entity/User';
import { UserService } from '../services/UserService';
import { Router } from '@angular/router';
import { SearchParam } from '../entity/SearchParam';

@Component({
	moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	model: any = {};
    loading = false;
    error = '';
    user:User;

  constructor(private authenticationService: AuthenticationService, 
  			public user_service:UserService,
  			private router: Router,
        private searchParam:SearchParam) { }


  ngOnInit() {
  	// reset login status
  	//this.authenticationService.logout();
  }

  // login() {
  //       this.loading = true;
  //       this.authenticationService.login(this.model.username, this.model.password)
  //           .subscribe(
  //             result => {
  //                     this.loading = false;
  //     				        this.user_service.user = result;
  //                     if (this.user_service.isLogin()) {

  //                         localStorage.setItem('currentUser', JSON.stringify(this.user_service.user));

  //                         // Get the redirect URL from our auth service
  //                         // If no redirect has been set, use the default
  //                         let redirect = this.authenticationService.redirectUrl ? 
  //                                       this.authenticationService.redirectUrl : '/search-by-code';
                   
  //                         // Redirect the user
  //                         this.router.navigate([redirect]);

  //                       	// this.router.navigate(['/search-by-code']);
  //                         this.error = 'УРА';
  //                     } else {
  //                         this.error = 'Username or password is incorrect';
  //                     }
  //                 },
  //             error => {
  //                     console.log('error');
  //                     this.loading = false;
  //                     this.error = 'Ошибка соединения с сервером';
  //                 }
  //           );

  //   }

  login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
              result => {
                      this.loading = false;
                      
                      if (result) {

//                          localStorage.setItem('currentUser', JSON.stringify(this.user_service.user));

                          // Get the redirect URL from our auth service
                          // If no redirect has been set, use the default
                          let redirect = this.authenticationService.redirectUrl ? 
                                        this.authenticationService.redirectUrl : '/search-by-car';
                   
                          // Redirect the user
                          this.router.navigate([redirect]);

                          // this.router.navigate(['/search-by-code']);
                          this.error = 'УРА';
                      } else {
                          this.error = 'Username or password is incorrect';
                      }
                  },
              error => {
                      console.log('error');
                      this.loading = false;
                      this.error = 'Ошибка соединения с сервером';
                  }
            );

    }

    logout(){
      this.authenticationService.logout();
      this.searchParam.clear();
    	// this.user_service.user.name = '';
    	// this.user_service.user.token = '';
    }

  login_promise() {
        this.loading = true;
        this.authenticationService.login_promise(this.model.username, this.model.password)
            .then(result => {
                if (result === true) {
//           	        var currentUser = JSON.parse(localStorage.getItem('currentUser'));

                	this.user = JSON.parse(localStorage.getItem('connectedUser'));
                    this.error = 'УРА';
                    this.loading = false;
//                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            })
            .catch( ()=>{
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }

            	);

//         this.authenticationService.login(this.model.username, this.model.password)
//             .subscribe(result => {
//                 if (result === true) {
//                     this.error = 'УРА';
//                     this.loading = false;
// //                    this.router.navigate(['/']);
//                 } else {
//                     this.error = 'Username or password is incorrect';
//                     this.loading = false;
//                 }
//             });
    }

}
