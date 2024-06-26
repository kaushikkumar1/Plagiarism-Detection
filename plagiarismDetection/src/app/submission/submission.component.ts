import {ChangeDetectionStrategy, Component, Input,OnInit} from "@angular/core";
import {Observable, of} from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as timeago from 'timeago.js';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  user_handle:any;
  asyncMeals:any;
  p: number = 1;
  total: number;
  loading: boolean;
  pages:any;
  findform: FormGroup;
  limit:any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiDataService: ApiDataService) {
      this.user_handle = this.route.snapshot.params.user_handle;
      this.pages=[5,10,25,50,100];
      this.limit=25;

      this.findform = new FormGroup(
        {
          pagelimit: new FormControl('', { validators: Validators.required })
        }
      )
     }

  ngOnInit(): void {
    this.getPage(1);
  }

  getPage(page: number) {
    this.loading = true;
   
    this.apiDataService.postData('/submission/user',{user_handle:this.user_handle,page:page-1,limit:this.limit}).subscribe(d=>{
      // console.log(d)
      this.total = d['total'];
      this.p = d['page'];
      this.asyncMeals=d['docs'];

      for(var i=0;i<this.asyncMeals.length;i++)
      {
        this.asyncMeals[i].timeago=timeago.format(this.asyncMeals[i].created_at_ms);
      }
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
