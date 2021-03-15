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
  currentUser: User;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private apiService: ApiService<User>, private commonService: CommonService,
    private router: Router
    //private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }


  async onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
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




    // const result = await this.authenticationService.login(this.f.email.value);
    //if (result) {
    //     const user = await result.user;
    //     const idToken = await user.getIdToken();

    //     this.authenticationService.login(idToken.toString())
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.currentUser = data;
    //                 this.apiService.get(Endpoints.COUNTRIES)
    //                     .pipe(first())
    //                     .subscribe(
    //                         data => {
    //                             this.commonService.setLocalStorage(this.commonService.COUNTRIES, data);
    //                         },
    //                         error => {
    //                             this.alertService.error(error);
    //                         });
    //                 //Load Roles at the begining and save in the local storage.
    //                 this.apiService.get(Endpoints.ROLES)
    //                     .pipe(first())
    //                     .subscribe(
    //                         data => {
    //                             this.commonService.setLocalStorage(this.commonService.ROLES, data);
    //                         },
    //                         error => {
    //                             this.alertService.error(error);
    //                         });
    //                 this.apiService.get(Endpoints.INSTITUTES)
    //                     .pipe(first())
    //                     .subscribe(
    //                         data => {
    //                             this.commonService.setLocalStorage(this.commonService.INSTITUTE, data);
    //                             this.router.navigate([`/` + Paths.INSTITUTE_ROUTE]);
    //                         },
    //                         error => {
    //                             this.alertService.error(error);
    //                             this.loading = false;
    //                         });
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }
  }
}
