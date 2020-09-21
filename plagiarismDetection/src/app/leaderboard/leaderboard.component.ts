import {ChangeDetectionStrategy, Component, Input,OnInit} from "@angular/core";
import {Observable, of} from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { link } from 'fs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {

  asyncMeals:any;
  p: number = 1;
  total: number;
  loading: boolean;
  limit:number;


  constructor(private apiservice:ApiDataService) { 
    this.limit=25;
  }


  ngOnInit() {
    this.getPage(1);
}

getPage(page: number) {
    this.loading = true;
   
    this.apiservice.postData('/leaderboard/data',{page:page-1,limit:this.limit}).subscribe(d=>{
      console.log(d)
      this.total = d['total'];
      this.p = d['page'];
      this.asyncMeals=d['data'];
      console.log(this.asyncMeals);
      this.p=this.p+1;
      this.loading = false;
    })
}

}
