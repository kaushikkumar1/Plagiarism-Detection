import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
declare var google: any;
import * as timeago from 'timeago.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  //declear variable here
  user_handle: any;
  data: any;
  submissionData: any;
  userSiteDetail: any;
  daySubmission: any;
  selectedDay: any;
  loading: boolean;

  constructor(private apiDataService: ApiDataService,private route: ActivatedRoute, private router: Router) {

    this.loading = false;
    this.user_handle = this.route.snapshot.params.user_handle;

    //get data for the calendar graph
    this.apiDataService.postData('/profile/user', { user_handle: this.user_handle }).subscribe(d => {
      this.data = d['data'];
      this.onClick();
    })

    //get data of different site
    this.apiDataService.postData('/site/recent/user', { user_handle: this.user_handle }).subscribe(d => {
      console.log(d);
      this.userSiteDetail = d['site_result'];

      for (var i = 0; i < this.userSiteDetail.length; i++) {
        var timeagoo = timeago.format(this.userSiteDetail[i].created_at_date_string);
        this.userSiteDetail[i].created_at_date_string = timeagoo;
      }
    })
  }

  ngOnInit(): void {
    google.charts.load("current", { packages: ["calendar"] });

    this.apiDataService.postData('/submission/user', { user_handle: this.user_handle, page: 0, limit: 10 }).subscribe(d => {
      this.submissionData = d['docs'];
      for (var i = 0; i < this.submissionData.length; i++) {
        var timeagoo = timeago.format(this.submissionData[i].created_at_ms);
        this.submissionData[i].created_at_ms = timeagoo;
      }
    })
  }


  drawChart(data: any) {
    // this.getSubmissionOfDay()
    var siz = 0;
    console.log(data);
    var new_data = [];
    var mapYear = {}

    for (var i = 0; i < data.length; i++) {
      let str = this.toolpicFormation(data[i]);
      if (Math.abs(data[i].WA) > data[i].AC)
        new_data.push([new Date(data[i].date), -data[i].WA, str]);
      else
        new_data.push([new Date(data[i].date), data[i].AC, str]);
      mapYear[data[i].date.slice(0, 4)] = 1;
    }

    siz = Object.keys(mapYear).length;   //get the no of diffrent years

    // console.log("GraphData",new_data);
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addColumn({ type: 'string', role: 'tooltip', 'p': { 'html': true } });
    dataTable.addRows(new_data);

    let chart = new google.visualization.Calendar(document.getElementById('myChart'));

    //get submission of the selected day
    google.visualization.events.addListener(chart, 'select', () => {
      var selection = chart.getSelection();
      console.log(new Date(selection[0].date));
      this.getSubmissionOfDay(selection[0].date);

    });


    var greenRedAxis = {
      colors: ['#CA1717', '#FFFFFF', '#27CE05'],
      values: [-5, 0, 5],
      maxValue: 5,
      minValue: -5
    }

    var options = {
      title: "Problem solved day wise",
      height: 200 * siz,
      calendar: { cellSize: 19 },
      tooltip: { isHtml: true },
      colorAxis: greenRedAxis,
      noDataPattern: { backgroundColor: '#eeeeee', color: '#eeeeee' },
    };

    chart.draw(dataTable, options);
  }

  onClick() {
    setTimeout(() => {
      google.charts.setOnLoadCallback(this.drawChart(this.data));
    }, 500);
  }

  onSubmission()  //view all submission
  {
    this.router.navigate(['/submission/' + this.user_handle]);
  }

  getSubmissionOfDay = function (date: any) {

    this.loading = true;
    this.apiDataService.postData('/submission/user/day', { roll_number: this.user_handle, date: date }).subscribe(d => {
      this.loading = false;
      console.log(d['all_submission_of_day']);
      this.daySubmission = d['all_submission_of_day'];
      let tempdate = JSON.stringify(new Date(date));
      this.selectedDay = tempdate.slice(1, 11);

      for (var i = 0; i < this.daySubmission.length; i++) {
        var timeagoo = timeago.format(this.daySubmission[i].created_at_ms);
        // console.log(timeagoo);

        this.daySubmission[i].created_at_ms = timeagoo;

      }

    })
  }

  toolpicFormation(data: any) {
    let html_string = "<div style='min-width: 180px;'>";
    html_string = "<h6>" + data.date + "</h6>";

    for (let d in data) {
      if (d != 'date')
        html_string += "<strong>" + d + ' : ' + data[d] + "</strong><br>";
    }
    html_string += "</div>";
    return html_string;

  }

}
