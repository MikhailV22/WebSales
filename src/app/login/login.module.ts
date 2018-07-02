import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { AuthenticationService } from '../services/AuthenticationService';
import { AuthGuard } from '../services/auth-guard.service';
import { UserService } from '../services/UserService';
import { SearchParam } from '../entity/SearchParam';

import { LoginComponent } from './login.component';
import { LoginRoutingModule  } from './login-routing.module';


@NgModule({
  declarations: [
    LoginComponent  ],
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    UserService,
    SearchParam
  ],
  exports:[LoginComponent]
})

export class LoginModule  { }
