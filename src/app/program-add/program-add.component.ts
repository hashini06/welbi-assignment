/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { ProgramDetails } from '../_models/programDetails';
import { CommonService } from '../_services/common.service';
import { Paths } from '../_utils/routes';

@Component({
  selector: 'app-program-add',
  templateUrl: './program-add.component.html',
  styleUrls: ['./program-add.component.scss']
})
export class ProgramAddComponent implements OnInit {

  programAddForm: FormGroup;
  submitted: Boolean = false;
  isAllDay: Boolean = false;
  isRepeated: Boolean = false;
  hobbiesForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService<ProgramDetails>,
    private commonService: CommonService, private router: Router, private _location: Location) { }

  ngOnInit(): void {

    this.programAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      allDay: [false, Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      tags: new FormArray([
        new FormControl('', Validators.required),
      ]),
      dimension: ['', Validators.required],
      facilitators: new FormArray([
        new FormControl('', Validators.required),
      ]),
      levelOfCare: new FormArray([
        new FormControl('', Validators.required),
      ]),
      isRepeated: [false],
      hobbies: new FormArray([
        new FormControl('', Validators.required),
      ])
    });
  }

  /* Hobbies */
  get hobbies(): FormArray {
    return this.programAddForm.get('hobbies') as FormArray;
  }

  addHobbies() {
    this.hobbies.push(new FormControl('', Validators.required));
  }

  /* Tags */

  get tags(): FormArray {
    return this.programAddForm.get('tags') as FormArray;
  }

  addItemTags() {
    this.tags.push(new FormControl('', Validators.required));
  }

  /* Facilitators */

  get facilitators(): FormArray {
    return this.programAddForm.get('facilitators') as FormArray;
  }

  addItemFacilitators() {
    this.facilitators.push(new FormControl('', Validators.required));
  }

  /* Level Of Care */

  get levelOfCare(): FormArray {
    return this.programAddForm.get('levelOfCare') as FormArray;
  }

  addItemLevelOfCare() {
    this.levelOfCare.push(new FormControl('', Validators.required));
  }

  get f() {
    return this.programAddForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    let currentDate = new Date();
    //
    this.programAddForm.value.start = new Date(currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate() + " " + this.programAddForm.value.start).toISOString();
    this.programAddForm.value.end = new Date(currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDate() + " " + this.programAddForm.value.end).toISOString();
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
