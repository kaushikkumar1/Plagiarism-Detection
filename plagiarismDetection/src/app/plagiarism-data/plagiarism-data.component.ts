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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiDataService: ApiDataService,
    private excelService: ExcelService) { }

  ngOnInit(): void {

 
    this.contest_name = this.route.snapshot.params.cn;
    console.log(this.contest_name);

    this.apiDataService.postData('/plagiarism/result', { contest_name: this.contest_name }).subscribe(d => {
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

  onGen() {
    console.log("generate xlsx");
    this.apiDataService.postData('/plagiarism/result/csv', { contest_name: this.contest_name }).subscribe(d => {
      console.log(d);
      this.excelService.exportAsExcelFile(d['msg'], this.contest_name);
    })
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
