/*
Developer - Hashini De Silva (hashinids@gmail.com)
Date - 2021-03-16
*/

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ApiService } from '../api/api.service';
import { User } from '../_models/user';
import { CommonService } from '../_services/common.service';
import { Paths } from '../_utils/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private apiService: ApiService<User>, private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }


  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.apiService.post("start", this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.commonService.setLocalStorage(this.commonService.CURRENT_USER, data.data.email);
          this.commonService.setLocalStorage(this.commonService.USER_TOKEN, data.data.token);
          this.router.navigate([`/` + Paths.RESIDENTS_LIST]);
        },
        error => {
          this.loading = false;
        });
  }
}
