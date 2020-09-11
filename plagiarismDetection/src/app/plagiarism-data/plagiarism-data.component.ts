import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiDataService: ApiDataService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    this.contest_name = this.route.snapshot.params.cn;
    console.log(this.contest_name);

    this.apiDataService.postD('/plagiarism/result', { contest_name: this.contest_name }).subscribe(d => {
      console.log(d);

      this.problem = d['problem'];
      this.data = d['msg'];

    })
  }

  onGen() {
    console.log("generate xlsx");
    this.apiDataService.postD('/plagiarism/result/csv', { contest_name: this.contest_name }).subscribe(d => {
      console.log(d);
      this.excelService.exportAsExcelFile(d['msg'], this.contest_name);
    })
  }
  onCall(id: any, id2: any, p1: any, p2: any) {
    //  console.log(id);
    this.router.navigate(['/create/plagiarism/data/' + id + "/" + id2 + "/" + p1 + "/" + p2]);
  }

}
