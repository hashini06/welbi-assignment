import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

import { ApiService } from '../api/api.service';
import { ProgramDetails } from '../_models/programDetails';
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

  constructor(private apiService: ApiService<ProgramDetails>, private commonService: CommonService) { }

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
        });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
