/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from '../_services/common.service';

export interface ResidentAttendance {
  programId: string;
  status: string;
}

@Component({
  selector: 'app-residents-attendance',
  templateUrl: './residents-attendance.component.html',
  styleUrls: ['./residents-attendance.component.scss']
})
export class ResidentsAttendanceComponent implements OnInit {
  sub: any;
  id: number;
  residentAttendanceDetails;
  dataSource: MatTableDataSource<ResidentAttendance>;
  displayedColumns: string[] = ['programId', 'status'];

  constructor(private route: ActivatedRoute, private commonService: CommonService, private _location: Location) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.residentAttendanceDetails = this.commonService.getLocalStorage(this.commonService.RESIDENTS_DETAIL)
        .find(x => x.id == params.id);
    });
    this.dataSource = new MatTableDataSource(this.residentAttendanceDetails.attendance);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  backClicked() {
    this._location.back();
  }


}
