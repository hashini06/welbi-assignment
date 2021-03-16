/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../_services/common.service';

export interface ResidentAttendance {
  residentId: string;
  status: string;
}

@Component({
  selector: 'app-program-attendance',
  templateUrl: './program-attendance.component.html',
  styleUrls: ['./program-attendance.component.scss']
})
export class ProgramAttendanceComponent implements OnInit {
  sub: any;
  id: number;
  programAttendanceDetails;
  dataSource: MatTableDataSource<ResidentAttendance>;
  displayedColumns: string[] = ['residentId', 'status'];

  constructor(private route: ActivatedRoute, private commonService: CommonService, private _location: Location) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.programAttendanceDetails = this.commonService.getLocalStorage(this.commonService.PROGRAMS_DETAIL)
        .find(x => x.id == params.id);
    });
    this.dataSource = new MatTableDataSource(this.programAttendanceDetails.attendance);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  backClicked() {
    this._location.back();
  }

}
