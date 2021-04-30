import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { ApiDataService } from '../api-data.service';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-plagiarism-data',
  templateUrl: './plagiarism-data.component.html',
  styleUrls: ['./plagiarism-data.component.css']
})
export class PlagiarismDataComponent implements OnInit {
  contest_name: any;
  problem: any;
  data: any;
  finalData:any;
  dropdownSettingsProbles:{}
  dropdownStatus:any;
  selectedStatus:any;
  all_problems:any;
  selected_all_problems:any;
  selected_all_contest:any;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiDataService: ApiDataService,
    private excelService: ExcelService) { }

  ngOnInit(): void {

    this.dropdownSettingsProbles = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }

 
    this.contest_name = this.route.snapshot.params.cn;
    this.selected_all_contest=[];
    this.selected_all_contest.push(this.contest_name);
    this.getProblemsOfContest();
    console.log(this.contest_name);


  }

  onStatusSelect(item:any){
   this.getReportOfproblem()
  }

  onStatusAll(item:any){
    this.getReportOfproblem();
  }
  
  onStatusDeSelect(item:any){
     this.getReportOfproblem();
  }

  onStatusDeSelectAll(item:any){
     this.getReportOfproblem();
    console.log("selected all");
  }

  getReportOfproblem(){

    console.log(this.selected_all_problems);
    this.apiDataService.postData('/plagiarism/result', { problem_name: this.selected_all_problems }).subscribe(d => {
      console.log(d);

      this.problem = d['problem'];
      this.data = d['msg'];
      this.finalData=[];

      for(var i=0;i<this.data.length;i++){
        // console.log(this.data[i]);
        var element =this.data[i];

      var temp=  {
        problemName:element.problemName,
        UserNameOne:element.UserNameOne,
        UserNameTwo:element.UserNameTwo,
        MatchPercent:Math.min(element.MatchPercentOne,element.MatchPercentTwo),
        MatchPercentOne:element.MatchPercentOne,
        MatchPercentTwo:element.MatchPercentTwo,
        TotalMatchedLine:element.TotalMatchedLine,
        SubmissionIdOne:element.SubmissionIdOne,
        SubmissionIdTwo:element.SubmissionIdTwo,
        MossViewLink:element.MossViewLink,
        _id:element._id,
        copied:element.copied
        }

        this.finalData.push(temp);
      }

    })

  }


  getProblemsOfContest(){
    this.apiDataService.postData('/contests/problem/user',{contests:this.selected_all_contest}).subscribe(d=>{
      console.log(d);
      // this.all_problems=d['data'];
      this.all_problems= d['crawled_problems'];
      // this.crawled_problem_length=this.crawled_problem.length;
      // console.log(this.crawled_problem);
    })
  }  


  onGen() {
    console.log("generate xlsx");
    console.log(this.finalData);
    // this.apiDataService.postData('/plagiarism/result/csv', { contest_name: this.contest_name }).subscribe(d => {
    //   console.log(d);
    //   this.excelService.exportAsExcelFile(d['msg'], this.contest_name);

    // })
    this.excelService.exportAsExcelFile(this.finalData, this.contest_name);

  }
  onCall(id: any, id2: any, p1: any, p2: any) {
    //  console.log(id);
    this.router.navigate(['/create/plagiarism/data/' + id + "/" + id2 + "/" + p1 + "/" + p2]);
  }


  onToggle(id:any,status:any,ind:any){
    ind=parseInt(ind);
    // console.log(ind);
    if(status==true) status=false;
    else status=true;
    this.apiDataService.postData('/update/plagiarism/data',{_id:id,flag:status}).subscribe(d=>{
      this.finalData[ind].copied=status;
    })
  }
}
