import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  constructor(private route: ActivatedRoute, private commonService: CommonService) { }

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

}
