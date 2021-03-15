import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResidentsListComponent } from './residents-list/residents-list.component';
import { ResidentsAttendanceComponent } from './residents-attendance/residents-attendance.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { ProgramAttendanceComponent } from './program-attendance/program-attendance.component';
import { Paths } from './_utils/routes';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: Paths.RESIDENTS_LIST, component: ResidentsListComponent },
  { path: Paths.RESIDENTS_ATTENDENCE + `/:id`, component: ResidentsAttendanceComponent },
  { path: Paths.PROGRAMS_LIST, component: ProgramListComponent },
  { path: Paths.PROGRAMS_ATTENDENCE + `/:id`, component: ProgramAttendanceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
