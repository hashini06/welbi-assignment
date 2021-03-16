import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { ProgramDetails } from '../_models/programDetails';
import { CommonService } from '../_services/common.service';
import { Paths } from '../_utils/routes';
import { Hobbies } from '../_models/hobbies';

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.scss']
})
export class ProgramAddComponent implements OnInit {

  programAddForm: FormGroup;
  submitted = false;
  isAllDay = false;
  isRepeated = false;
  hobbies = [];

  constructor(private formBuilder: FormBuilder, private apiService: ApiService<ProgramDetails>,
    private commonService: CommonService, private router: Router, private _location: Location) { }

  ngOnInit(): void {

    this.programAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      allDay: ['', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      tags: ['', Validators.required],
      dimension: [''],
      facilitators: [''],
      levelOfCare: [''],
      hobbies: [],
      isRepeated: ['']
    });
  }

  get hobbies_() {
    return this.programAddForm.get("alias") as FormArray;
  }

  get f() {
    return this.programAddForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // this.programAddForm.value.name = this.programAddForm.value.firstName + " " + this.programAddForm.value.lastName
    // this.programAddForm.controls.hobbies = [];
    console.log(this.programAddForm.value);
    // return;
    this.apiService.post("programs?token=" + this.commonService.getLocalStorage(this.commonService.USER_TOKEN), this.programAddForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([`/` + Paths.PROGRAMS_LIST]);
        },
        error => {
        });
  }

  backClicked() {
    this._location.back();
  }

  onToggleRepetaed(event) {
    this.isRepeated = event.checked;
    this.programAddForm.value.isRepeated = this.isRepeated;
  }

  onToggle(event) {
    this.isAllDay = event.checked;
    this.programAddForm.value.isAllDay = this.isAllDay;
  }

}
