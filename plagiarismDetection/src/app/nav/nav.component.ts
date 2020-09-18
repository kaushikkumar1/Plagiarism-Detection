import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogedIn: boolean;

  constructor(private authService: AuthService,
    private router: Router,) {
    this.isLogedIn = false;
  }

  ngOnInit(): void {
    this.isLogedIn = this.authService.islogedin();
    if (!this.isLogedIn) {
      this.router.navigate(['/auth/login']);

    }
  }

  logOut() {
    console.log("logout");
    this.authService.logOut();
    window.location.reload();
  }
}
