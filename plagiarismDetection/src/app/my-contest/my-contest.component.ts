import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiDataService } from '../api-data.service';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

var async = require("async");

@Component({
  selector: 'app-my-contest',
  templateUrl: './my-contest.component.html',
  styleUrls: ['./my-contest.component.css']
})
export class MyContestComponent implements OnInit {
  generateResultform:FormGroup;
  uniqueContestResult:any;

  dropdownSettings:{};
  dropdownSettingsProbles:{}
  dropdownStatus:any;
  selectedStatus:any;
  all_contest:any;
  all_problems:any;
  selected_all_contest:any;
  selected_all_problems:any;
  selectedDay:any;
  loading:boolean;
  ascending:any;
  sortField:any;
  crawled_problem:any;
  crawled_problem_length:0;
  filesArray:any;

  constructor(
    private apiDataService: ApiDataService,
    private route: ActivatedRoute,
    private router: Router, private authService: AuthService) { 

      this.apiDataService.getData('/contests/user').subscribe((data) => {
        console.log(data);
        this.all_contest=data['data'];
      })

      this.apiDataService.getData('/unique/contest/result').subscribe((data) => {
        console.log(data);
        this.uniqueContestResult = data;
      })

      this.generateResultform = new FormGroup({
        contest_name: new FormControl('', { validators: Validators.required })
      })

    }

  ngOnInit(): void {

    this.dropdownSettings  = {
      singleSelection: true,
      idField: '_id',
      textField: 'contest_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.dropdownSettingsProbles = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }

  onStatusSelectContest(item:any){
    this.getProblemsOfContest();
  }


  onStatusDeSelectContest(item:any){
    this.getProblemsOfContest();

  }

  getProblemsOfContest(){
    this.apiDataService.postData('/contests/problem/user',{contests:this.selected_all_contest}).subscribe(d=>{
      console.log(d);
      this.all_problems=d['data'];
      this.crawled_problem= d['crawled_problems'];
      this.crawled_problem_length=this.crawled_problem.length;
      console.log(this.crawled_problem);
    })
  }



  onStatusSelect(item:any){
    // this.generateReportOfProblem()
  }

  onStatusAll(item:any){
    // this.generateReportOfProblem();
  }
  
  onStatusDeSelect(item:any){
    // this.generateReportOfProblem();
  }

  onStatusDeSelectAll(item:any){
    // this.generateReportOfProblem();
    console.log("selected all");
  }

  

  generateReport(){
    console.log("Generate",this.selected_all_problems);
    this.generateReportOfProblem();

  }
  async generateReportofOneProblem(data,item){

   this.apiDataService.postData('/generate/file', {problem_id:data,item}).subscribe(d => {
          console.log(d);
          this.filesArray=d['files'];
  
          // this.fillUrl1 = true;
    
          this.apiDataService.getData('/exe').subscribe(d=>{
            // this.fillUrl2=true;
           
            this.apiDataService.postData('/exe/delete',{files:this.filesArray}).subscribe((d)=>{
              console.log(d);
              // this.fillUrl3=true;
            })
            console.log(d);
          })
        })
  }

 async  generateReportOfProblem(){

   for(var i=0;i<this.selected_all_problems.length;i++){
      let id = this.selected_all_problems[i].item_id;
    let data= await this.generateReportofOneProblem(id,i);
   }

    // for(var i=0;i<this.selected_all_problems.length;i++){
    //   let id = this.selected_all_problems[i].item_id;
    //   
    // }

   

  }

  onGenerate(){
    console.log("generate");
    this.router.navigate(['/plagiarism/result/'+this.generateResultform.value.contest_name]);
  }


}
