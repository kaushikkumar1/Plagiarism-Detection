import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormBuilder, Validators } from '@angular/forms'
import {AuthService} from '../../auth.service'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  testForm:FormGroup;

  constructor(private fb: FormBuilder,
    private apiDataService:AuthService,
    private route: ActivatedRoute,
    private router: Router,) { 
    this.testForm = this.fb.group({
      email: ['', [Validators.required]],
      createPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }
  
  onSubmit(){
    console.log(this.testForm.valid);

    if(this.testForm.value.createPassword==this.testForm.value.confirmPassword){
    this.apiDataService.signUp(this.testForm.value).subscribe((d)=>{
      console.log(d);
     localStorage.setItem('token',d['token']);
     this.router.navigate(['/home']);
     alert("Registration Successfull");

    })}else{
     alert("confirm same password for create password and confirm password")
    }
  }
}
