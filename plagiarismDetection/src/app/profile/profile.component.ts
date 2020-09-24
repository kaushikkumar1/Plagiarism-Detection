import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
declare var google: any;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user_handle: any;
  data:any;
  submissionData:any;
  userSiteDetail:any;

  constructor(private apiDataService: ApiDataService,
    private route: ActivatedRoute,
    private router: Router) {

    this.user_handle = this.route.snapshot.params.user_handle;

    //get data for the calendar graph
    this.apiDataService.postData('/profile/user', { user_handle: this.user_handle }).subscribe(d => {
      this.data=d['data'];
      this.onClick();
    })

    //get data of different site
    this.apiDataService.postData('/site/recent/user',{user_handle:this.user_handle}).subscribe(d=>{
      console.log(d);
      this.userSiteDetail=d['site_result'];
    })
  }

  ngOnInit(): void {
    google.charts.load("current", {packages:["calendar"]});

    this.apiDataService.postData('/submission/user',{user_handle:this.user_handle,page:0,limit:10}).subscribe(d=>{

      this.submissionData=d['docs'];
      console.log(this.submissionData);

      for(var i=0;i<this.submissionData.length;i++)
      {
        var timestamp = new Date(this.submissionData[i].created_at_ms*1000);
        // var todate=new Date(timestamp).getDate();
        // var tomonth=new Date(timestamp).getMonth()+1;
        // var toyear=new Date(timestamp).getFullYear();
        // var original_date=tomonth+'/'+todate+'/'+toyear;
        // this.submissionData[i].created_at_ms=original_date;

        // this.submissionData[i].created_at_ms=timestamp.toISOString();


        this.submissionData[i].created_at_ms=new Date(this.submissionData[i].created_at_ms);
        // this.submissionData[i].created_at_ms=JSON.stringify(this.submissionData[i].created_at_ms).slice(0,20);
        

      }
     
    })

  }


   drawChart(data:any) {

    var siz=0;
     console.log(data);
    var new_data = [];
    var mapYear={}

    for (var i = 0; i < data.length; i++) {
      console.log(data[i]._id.date);
      new_data.push([new Date(data[i]._id.date), data[i].accepted_count]);
      mapYear[data[i]._id.date.slice(0,4)]=1;
    }

    siz = Object.keys(mapYear).length;   //get the no of diffrent years
    console.log(siz);

    for( var k in mapYear)
    console.log(k);

    console.log("GraphData",new_data);
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addRows(new_data);

    var chart = new google.visualization.Calendar(document.getElementById('myChart'));

    var options = {
      title: "Problem solved day wise",
      height: 200*siz,
      calendar: { cellSize: 19 },
    };

    chart.draw(dataTable, options);
}

onClick() {
  setTimeout(() => {
      google.charts.setOnLoadCallback(this.drawChart(this.data));
  }, 1000);
}

onSubmission()  //view all submission
{
  this.router.navigate(['/submission/'+this.user_handle]);
}
}
