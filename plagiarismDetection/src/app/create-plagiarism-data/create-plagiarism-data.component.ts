import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiDataService } from '../api-data.service';
import {ExcelService} from '../excel.service';
@Component({
  selector: 'app-create-plagiarism-data',
  templateUrl: './create-plagiarism-data.component.html',
  styleUrls: ['./create-plagiarism-data.component.css']
})
export class CreatePlagiarismDataComponent implements OnInit {

  submissionId: any;
  submissionId2: any;
  data: any;
  data2: any;

  p1:any;
  p2:any;

  userNameOne:any;
  userNameTwo;any;
  profileUrlOne:any;
  profileUrlTwo:any;
  problemId:any;
  problemViewLink:any;

  constructor(private route: ActivatedRoute,
    private excelService:ExcelService,
    private router: Router,

    private apiDataService: ApiDataService) {

    this.submissionId = this.route.snapshot.params.id;
    this.submissionId2 = this.route.snapshot.params.id2;

    this.p1=this.route.snapshot.params.p1;
    this.p2=this.route.snapshot.params.p2;


    console.log(this.submissionId2);

    this.profileUrlOne="https://www.hackerrank.com/";
    this.profileUrlTwo="https://www.hackerrank.com/";

    this.apiDataService.getD('/submission/code/' + this.submissionId).subscribe(d => {
      console.log(d);
      this.data = d['submission_code'];
      this.userNameOne=d['site_user_handle'];
      this.profileUrlOne=this.profileUrlOne+this.userNameOne;
      this.problemId=d['problem_name'];
      this.problemViewLink=d['problem_view_link'];
    })

    this.apiDataService.getD('/submission/code/' + this.submissionId2).subscribe(d => {
      console.log(d);
      this.data2 = d['submission_code'];
      this.userNameTwo=d['site_user_handle'];
      this.profileUrlTwo=this.profileUrlTwo+this.userNameTwo;

    })
  }


  ngOnInit(): void {
  }

}
