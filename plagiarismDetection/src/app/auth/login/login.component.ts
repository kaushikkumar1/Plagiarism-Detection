import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';
import { FormGroup, FormControl, NgForm, FormBuilder, Validators } from '@angular/forms'
import {AuthService} from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert: ElementRef;

  testForm: FormGroup;
  islogedin:boolean;


  constructor(private fb: FormBuilder,
    private apiDataServoce:AuthService,
    private route: ActivatedRoute,
    private router: Router) {


      this.islogedin=false;
    

    this.testForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })

   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.testForm.value);
    this.apiDataServoce.signIn(this.testForm.value).subscribe((d)=>{
      console.log(d);
     localStorage.setItem('token',d['token'])
    //  this.router.navigate(['/home']);
     this.islogedin=true;
     alert("Login Successful");
     this.router.navigate(['/create/file']);
    },(error)=>{
      alert("wrong user_name or password");
    })
  }

  
    closeAlert() {
      this.alert.nativeElement.classList.remove('show');
    }
  
}


