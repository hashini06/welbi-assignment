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
  submitted: Boolean = false;
  isAllDay: Boolean = false;
  isRepeated: Boolean = false;
  hobbiesForm: FormGroup;
  hobbies: FormArray;
  levelOfCare: FormArray;
  tags: FormArray;
  facilitators: FormArray;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService<ProgramDetails>,
    private commonService: CommonService, private router: Router, private _location: Location) { }

  ngOnInit(): void {

    this.programAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      allDay: [false, Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
      tags: this.formBuilder.array([this.createTags()]),
      dimension: ['', Validators.required],
      facilitators: this.formBuilder.array([this.createFacilitators()]),
      levelOfCare: this.formBuilder.array([this.createLevelOfCare()]),
      isRepeated: [false],
      hobbies: this.formBuilder.array([this.createHobbies()])
    });
  }

  createHobbies(): FormGroup {
    return this.formBuilder.group({
      hobbies: ''
    });
  }

  addItem(): void {
    this.hobbies = this.programAddForm.get('hobbies') as FormArray;
    this.hobbies.push(this.createHobbies());
  }


  createLevelOfCare(): FormGroup {
    return this.formBuilder.group({
      levelOfCare: ''
    });
  }

  addItemLevelOfCare(): void {
    this.levelOfCare = this.programAddForm.get('levelOfCare') as FormArray;
    this.levelOfCare.push(this.createLevelOfCare());
  }

  createTags(): FormGroup {
    return this.formBuilder.group({
      tags: ''
    });
  }

  addItemTags(): void {
    this.tags = this.programAddForm.get('tags') as FormArray;
    this.tags.push(this.createTags());
  }


  createFacilitators(): FormGroup {
    return this.formBuilder.group({
      facilitators: ''
    });
  }

  addItemFacilitators(): void {
    this.facilitators = this.programAddForm.get('facilitators') as FormArray;
    this.facilitators.push(this.createFacilitators());
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
    return;
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
