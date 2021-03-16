/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

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
  }

  logout() {
    this.commonService.clearLocalStorage();
    this.router.navigate([`/`]);
  }

}
