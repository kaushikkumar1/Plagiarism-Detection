import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-generate-plagiarism-report',
  templateUrl: './generate-plagiarism-report.component.html',
  styleUrls: ['./generate-plagiarism-report.component.css']
})

export class GeneratePlagiarismReportComponent implements OnInit {
  findform: FormGroup;
  constructor(private apiDataService: ApiDataService,
    private route: ActivatedRoute,
    private router: Router, private authService: AuthService) {
      
    this.findform = new FormGroup({
      email: new FormControl('', { validators: Validators.required }),
      isActiveContest: new FormControl('', { validators: Validators.required }),
      contest_name: new FormControl('', { validators: Validators.required }),
      _hrank_session: new FormControl('', { validators: Validators.required })
    })
  }

  ngOnInit(): void {
  }

  onFind() {
    console.log(this.findform.value);
    this.apiDataService.postData('/submission/contest', this.findform.value).subscribe(d => {
      console.log(d);
      alert(d['status'] + " " + d['data']);
      // this.router.navigate(['/create/file']);
    })
  }

}
