import { Injectable,isDevMode  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url:any;

  constructor(private http: HttpClient) { 
    this.url='';

    if(isDevMode()) {
      this.url = "http://localhost:3000";
    }
  }

  signUp(form:any){
    return this.http.post(this.url+'/api/auth/register',form);
  }

  signIn(form:any){
    return this.http.post(this.url+'/api/auth/login',form);
  }

  logOut(){
    localStorage.removeItem('token');
  }

  islogedin(){
    if(localStorage.getItem('token')) return true;
    return false;
  }
}
