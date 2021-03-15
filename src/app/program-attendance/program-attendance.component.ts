import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  constructor(private route: ActivatedRoute, private commonService: CommonService) { }

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

}
