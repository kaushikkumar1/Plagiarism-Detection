import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.css']
})
export class CreateFileComponent implements OnInit {
  findform: FormGroup;

  UrlformC:FormGroup;
  UrlformCpp:FormGroup;
  UrlformPython:FormGroup;
  UrlformJava:FormGroup;
  generateResultform:FormGroup;

  contests: any;
  fillUrl: boolean;


  constructor(private apiDataService: ApiDataService,
    private route: ActivatedRoute,
    private router: Router,private authService:AuthService) {
    this.fillUrl=false;

    this.findform = new FormGroup({
      contest_name: new FormControl('', { validators: Validators.required })
    })

    this.UrlformC = new FormGroup({
      url: new FormControl('', { validators: Validators.required })
    })

    this.UrlformCpp = new FormGroup({
      url: new FormControl('', { validators: Validators.required })
    })

    this.UrlformJava = new FormGroup({
      url: new FormControl('', { validators: Validators.required })
    })

    this.UrlformPython = new FormGroup({
      url: new FormControl('', { validators: Validators.required })
    })

    this.generateResultform = new FormGroup({
      contest_name: new FormControl('', { validators: Validators.required })
    })

  }

  ngOnInit(): void {

    this.apiDataService.getData('/unique/contest').subscribe((d) => {
      console.log(d);
      this.contests = d;
    })

  }


  onFind() {
    console.log("find instructor by id", this.findform.value)
    this.apiDataService.postData('/generate/file', this.findform.value).subscribe(d => {
      console.log(d);
      this.fillUrl = true;
    })

  }

  onFindC() {
    console.log("c url",this.UrlformC.value )
    this.apiDataService.postData('/scrap/data', this.UrlformC.value).subscribe(d => {
      console.log(d);
      this.fillUrl = true;
    })

  }
  onFindCpp() {
    console.log("cpp url", this.UrlformCpp.value)
    this.apiDataService.postData('/scrap/data', this.UrlformCpp.value).subscribe(d => {
      console.log(d);
      this.fillUrl = true;
    })

  }
  onFindPython() {
    console.log("python url ", this.UrlformPython.value)
    this.apiDataService.postData('/scrap/data', this.UrlformPython.value).subscribe(d => {
      console.log(d);
      this.fillUrl = true;
    })

  }
  onFindJava() {
    console.log("java url", this.UrlformJava.value)
    this.apiDataService.postData('/scrap/data', this.UrlformJava.value).subscribe(d => {
      console.log(d);
      this.fillUrl = true;
    })

  }
  onLogout(){
    this.authService.logOut();
  }

  onScrap(){
    this.fillUrl=true;
  }

  onGenerate(){
    console.log("generate");
    this.router.navigate(['/plagiarism/result/'+this.generateResultform.value.contest_name]);
  }
}
