/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { UserDetails } from '../_models/UserDetails';
import { CommonService } from '../_services/common.service';
import { Paths } from '../_utils/routes';

@Component({
  selector: 'app-residents-list',
  templateUrl: './residents-list.component.html',
  styleUrls: ['./residents-list.component.scss']
})
export class ResidentsListComponent implements OnInit {
  residents: [];
  public Paths = Paths;

  constructor(private apiService: ApiService<UserDetails>, private commonService: CommonService) { }

  ngOnInit(): void {
    this.apiService.get("residents?token=" + this.commonService.getLocalStorage(this.commonService.USER_TOKEN))
      .pipe(first())
      .subscribe(
        data => {
          this.commonService.setLocalStorage(this.commonService.RESIDENTS_DETAIL, data);
          this.residents = data;
        },
        error => {
        });
  }

}
