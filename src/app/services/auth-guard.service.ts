import { Injectable }     from '@angular/core';
import {
		  CanActivate, Router,
		  ActivatedRouteSnapshot,
		  RouterStateSnapshot
		} from '@angular/router';
import { AuthenticationService } from './AuthenticationService';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map'
// import { map } from 'rxjs/operators';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log('AuthGuard#canActivate called');
    let url: string = state.url;
//    return this.checkLogin(url);
     this.checkLogin(url);
     return true;
  }

  checkLogin_(url: string): boolean {

    if (this.authService.user_service.isLogin()) { return true; }
    

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }

  checkLogin(url: string) {
    // проверяем живой ли токен
    this.authService.check_token().subscribe(
      (result)=>{
        // Если токен живой тогда выходим
        if (result) { return; }
        
      },
      (err)=>{
        // Если токен не живой тогда уходим на страницу login
         // console.log('ERROR');
        this.authService.logout();

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/login']);

      }

    );

  }  

}