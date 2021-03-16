import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from './_utils/routes';
import { CommonService } from './_services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'welbi-assignment';
  Paths = Paths;

  constructor(private commonService: CommonService, private router: Router) { }

  logout() {
    this.commonService.clearLocalStorage();
    this.router.navigate([`/`]);
  }

}
