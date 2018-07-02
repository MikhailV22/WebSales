import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import {HttpClientModule} from '@angular/common/http';


import { ApiResultService } from '../services/ApiResultService';

// import { UserService } from './services/UserService';


import { ProdImagesComponent } from './prod-images.component';

@NgModule({
  declarations: [
    // SearchByCodeComponent,
    ProdImagesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  
  exports:[ProdImagesComponent],
  providers: [
  	ApiResultService
  ]
})
export class ProdImagesModule { }
