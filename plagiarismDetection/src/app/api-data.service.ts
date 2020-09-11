import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiDataService {
  url = '';

  constructor(private http: HttpClient) {
    if (isDevMode()) {
      this.url = "http://localhost:3000";
    }
  }

  getData(route) {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token')
    })
    return this.http.get(this.url + '/api' + route,{headers});
  }

  getD(route) {
   
    return this.http.get(this.url + '/api' + route);
  }

  postData(route, body) {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token')
    })
    return this.http.post(this.url + '/api' + route, body,{headers});

  }

  postD(route, body) {

    return this.http.post(this.url + '/api' + route, body,);

  }

  putData(route, body) {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token')
    })
    return this.http.put(this.url + '/api' + route, body,{headers});

  }

  deleteData(route) {
    const headers = new HttpHeaders({
      'token': localStorage.getItem('token')
    })
    return this.http.delete(this.url + '/api' + route,{headers});

  }
}