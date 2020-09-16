import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { templateJitUrl } from '@angular/compiler';


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
  fillUrl1: boolean;
  fillUrl2:boolean;
  fillUrl3:boolean;
  disableForm:boolean;
  filesArray:any;
  uniqueContestResult:any;


  constructor(private apiDataService: ApiDataService,
    private route: ActivatedRoute,
    private router: Router,private authService:AuthService) {
    this.fillUrl1=false;
    this.fillUrl2=false;
    this.fillUrl3=false;
    this.disableForm=false;

    this.findform = new FormGroup({
      contest_name: new FormControl('', { validators: Validators.required })
    })


    this.generateResultform = new FormGroup({
      contest_name: new FormControl('', { validators: Validators.required })
    })

  }

  ngOnInit(): void {

    this.apiDataService.getData('/unique/contest').subscribe((d) => {
      console.log(d);
      this.contests = d;
      this.apiDataService.getData('/unique/contest/result').subscribe((data) => {
        console.log(data);
        this.uniqueContestResult = data;
        var temp=[];

        for(var i=0;i<this.contests.length;i++){
          if(!this.uniqueContestResult.includes(this.contests[i]))
          temp.push(this.contests[i]);
        }
        
        // this.contests=temp;
        console.log(this.contests);
      })
    })

   

  }


  onFind() {
    this.disableForm=true;
    console.log("find instructor by id", this.findform.value)
    this.fillUrl1=false;
    this.fillUrl2=false;
    this.fillUrl3=false;
    this.apiDataService.postData('/generate/file', this.findform.value).subscribe(d => {
      console.log(d);
      this.filesArray=d['files'];
      this.fillUrl1 = true;

      this.apiDataService.getData('/exe').subscribe(d=>{
        this.fillUrl2=true;
       
        this.apiDataService.postData('/exe/delete',{files:this.filesArray}).subscribe((d)=>{
          console.log(d);
          this.fillUrl3=true;
          this.disableForm=false;
        })
        console.log(d);
      })
    })
  }

  
  onLogout(){
    this.authService.logOut();
  }

  
  onGenerate(){
    console.log("generate");
    this.router.navigate(['/plagiarism/result/'+this.generateResultform.value.contest_name]);
  }
}




// onFindC() {
//   console.log("c url",this.UrlformC.value )
//   this.apiDataService.postData('/scrap/data', this.UrlformC.value).subscribe(d => {
//     console.log(d);
//     this.fillUrl = true;
//   })

// }
// onFindCpp() {
//   console.log("cpp url", this.UrlformCpp.value)
//   this.apiDataService.postData('/scrap/data', this.UrlformCpp.value).subscribe(d => {
//     console.log(d);
//     this.fillUrl = true;
//   })

// }
// onFindPython() {
//   console.log("python url ", this.UrlformPython.value)
//   this.apiDataService.postData('/scrap/data', this.UrlformPython.value).subscribe(d => {
//     console.log(d);
//     this.fillUrl = true;
//   })

// }
// onFindJava() {
//   console.log("java url", this.UrlformJava.value)
//   this.apiDataService.postData('/scrap/data', this.UrlformJava.value).subscribe(d => {
//     console.log(d);
//     this.fillUrl = true;
//   })
