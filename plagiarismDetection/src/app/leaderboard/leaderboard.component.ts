import {ChangeDetectionStrategy, Component, Input,OnInit} from "@angular/core";
import {Observable, of} from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { link } from 'fs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
  pages:any;
  findform: FormGroup;
  limit:any;

  constructor(private apiservice:ApiDataService,private route: ActivatedRoute,
    private router: Router) { 
      this.pages=[5,10,25,50,100];
      this.limit=25;

      this.findform = new FormGroup(
        {
          pagelimit: new FormControl('', { validators: Validators.required })
        }
      )
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
onFind(){
  console.log(this.findform.value);
  this.limit= parseInt(this.findform.value.pagelimit);
  this.getPage(this.p);
}

}
