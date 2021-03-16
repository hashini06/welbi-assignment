import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { ProgramDetails } from '../_models/programDetails';
import { CommonService } from '../_services/common.service';
import { Paths } from '../_utils/routes';
import { Hobbies } from '../_models/hobbies';


@Component({
  selector: 'app-program-add-to-resident',
  templateUrl: './program-add-to-resident.component.html',
  styleUrls: ['./program-add-to-resident.component.scss']
})
export class ProgramAddToResidentComponent implements OnInit {
  programAddToResidentForm: FormGroup;
  submitted: Boolean = false;
  programList: ProgramDetails[];
  sub: any;
  id: number;
  residentAttendanceDetails;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService<ProgramDetails>,
    private commonService: CommonService, private router: Router, private _location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.residentAttendanceDetails = this.commonService.getLocalStorage(this.commonService.RESIDENTS_DETAIL)
        .find(x => x.id == params.id);
    });

    if (this.commonService.getLocalStorage(this.commonService.PROGRAMS_DETAIL) == null
      || this.commonService.getLocalStorage(this.commonService.PROGRAMS_DETAIL).length == 0) {
      this.apiService.get("programs?token=" + this.commonService.getLocalStorage(this.commonService.USER_TOKEN))
        .pipe(first())
        .subscribe(
          data => {
            this.commonService.setLocalStorage(this.commonService.PROGRAMS_DETAIL, data);
            this.programList = data;
          },
          error => {
          });
    } else {
      this.programList = this.commonService.getLocalStorage(this.commonService.PROGRAMS_DETAIL);
    }

    this.programAddToResidentForm = this.formBuilder.group({
      program: [''],
      residentId: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  get f() {
    return this.programAddToResidentForm.controls;
  }

  backClicked() {
    this._location.back();
  }

  onSubmit() {
    this.programAddToResidentForm.value.residentId = this.id;
    this.apiService.post("programs/" + this.programAddToResidentForm.value.program + "/attend?token=" + this.commonService.getLocalStorage(this.commonService.USER_TOKEN), this.programAddToResidentForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([`/` + Paths.RESIDENTS_LIST]);
        },
        error => {
        });
  }
}
