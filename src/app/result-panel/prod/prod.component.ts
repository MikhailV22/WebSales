import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from '../../entity/SearchResult';
import { UserService } from '../../services/UserService';

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.css','./glass_colors.css']
})
export class ProdComponent implements OnInit {

	@Input() searchResult:SearchResult;
  @Input() selectedId:number;
	showGoodsPanel:Boolean=false;
  showProdPanel:Boolean=false;
  baseURL = document.location.protocol +"//"+ document.location.host.replace('4200','80')+'/';


  constructor(private userService:UserService) { 

  }

  ngOnInit() {

  }

	onClickMe(searchResult:SearchResult) {
	    alert(searchResult.euro);
  }


	goodsPanelToggle() {
      if(this.searchResult.onStock!=0){
        this.showProdPanel = false;
  	    this.showGoodsPanel = !this.showGoodsPanel;
      }
  }

  prodPanelToggle() {
        this.showGoodsPanel = false;
        this.showProdPanel = !this.showProdPanel;
  }

  
  showProd(){
    console.log('showProd');
  }

  onVoted(agreed: boolean) {
    this.goodsPanelToggle();
  }

  getImageLink(img:String){
    return this.baseURL+"/WebSalesMobile/ImagesBank/pic_small/"+img+"?token="+this.userService.user.token;
  }


}
