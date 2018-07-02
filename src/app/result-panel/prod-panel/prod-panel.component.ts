import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SearchResult } from '../../entity/SearchResult';
import { ApiResultService } from '../../services/ApiResultService';
import { File } from '../../entity/File';



@Component({
  selector: 'app-prod-panel',
  templateUrl: './prod-panel.component.html',
  styleUrls: ['./prod-panel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProdPanelComponent implements OnInit {
  @Input() searchResult:SearchResult;

  constructor(private apiResultService : ApiResultService) { }



  ngOnInit() {

   	this.apiResultService.getResult(this.searchResult.id)
      .subscribe(res=>{
        this.searchResult = res;
      });

  }



}
