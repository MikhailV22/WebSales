import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ApiResultService } from '../services/ApiResultService';
import { File } from '../entity/File';
import { UserService } from '../services/UserService';
import { baseURL } from '../entity/API_path';

@Component({
  selector: 'app-prod-images',
  templateUrl: './prod-images.component.html',
  styleUrls: ['./prod-images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProdImagesComponent implements OnInit {

  @Input() euro:String;

  images:File[];
  selectedImage:File;
  isImageLoading:Boolean=false;
//  baseURL = document.location.protocol +"//"+ document.location.host.replace('4200','80')+'/';

  constructor(private apiResultService : ApiResultService,
            private userService:UserService) { }


  

  ngOnInit() {
    this.isImageLoading=true;
    this.apiResultService.getImages(this.euro)
      .subscribe(res=>{
        this.isImageLoading=false;
        this.images = res;
        
      });
  }


  setImage(item){
    this.selectedImage = item;
  }


  getImageLink(img:String,sufix:String){
    return baseURL+"/ImagesBank/pic"+sufix+"/"+img+"?token="+this.userService.user.token;
  }

}
