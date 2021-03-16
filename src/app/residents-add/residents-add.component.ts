import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { UserDetails } from '../_models/UserDetails';
import { CommonService } from '../_services/common.service';
import { Paths } from '../_utils/routes';

@Component({
  selector: 'app-residents-add',
  templateUrl: './residents-add.component.html',
  styleUrls: ['./residents-add.component.scss']
})
export class ResidentsAddComponent implements OnInit {
  residentAddForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService<UserDetails>,
    private commonService: CommonService, private router: Router, private _location: Location) { }

  ngOnInit(): void {

    this.residentAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      name: ['', Validators.required],
      room: [''],
      levelOfCare: ['', Validators.required],
      ambulation: ['', Validators.required],
      birthDate: ['', Validators.required],
      moveInDate: ['']
    });

  }

  get f() {
    return this.residentAddForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.residentAddForm.value.name = this.residentAddForm.value.firstName + " " + this.residentAddForm.value.lastName
    this.apiService.post("residents?token=" + this.commonService.getLocalStorage(this.commonService.USER_TOKEN), this.residentAddForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([`/` + Paths.RESIDENTS_LIST]);
        },
        error => {
        });
  }

  backClicked() {
    this._location.back();
  }


}
