import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from './_utils/routes';
import { LoginComponent } from './login/login.component';
import { CommonService } from './_services/common.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'welbi-assignment';
  Paths = Paths;
  currentUser: User;

  constructor(private commonService: CommonService, private router: Router,) {
    //this.loginComponent.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser)
  }

  // ngOnInit() {
  //   this.currentUser = this.commonService.getLocalStorage(this.commonService.USER_TOKEN);
  //   console.log(this.currentUser)
  // }

  logout() {
    this.commonService.clearLocalStorage();
    this.router.navigate([`/`]);
  }

}
