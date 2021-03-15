import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';

import { ApiService } from '../api/api.service';
import { User } from '../_models/user';
import { CommonService } from '../_services/common.service';
import { Paths } from '../_utils/routes';

@Component({
  selector: 'app-program-list',
  templateUrl: './program-list.component.html',
  styleUrls: ['./program-list.component.scss']
})
export class ProgramListComponent implements OnInit {
  programs: [];
  public Paths = Paths;
  dataSource;

  constructor(private apiService: ApiService<User>, private commonService: CommonService) { }

  ngOnInit(): void {
    this.apiService.get("programs?token=" + this.commonService.getLocalStorage(this.commonService.USER_TOKEN))
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.commonService.setLocalStorage(this.commonService.PROGRAMS_DETAIL, data);
          this.programs = data;
          this.dataSource = new MatTableDataSource(this.programs);
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
