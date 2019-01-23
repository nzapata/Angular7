import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { BrandDto } from '../../_models/brandDto'
import { User } from '../../_models/user';

import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { IrewardApiService } from '../../_services/ireward-api.service';

@Component({
  selector: 'app-sign-up-brand',
  templateUrl: './sign-up-brand.component.html',
  styleUrls: ['./sign-up-brand.component.css']
})
export class SignUpBrandComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private irewardapiService: IrewardApiService,
    private alertService: AlertService
  ) {
    // redirect to welcome-brand if already logged in
  /*  if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }*/
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.].{6,}/)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    let userObj = new User();
    let userEmail = this.registerForm.value.email;
    let userPassword = this.registerForm.value.password;
    userObj.username = userEmail;

    this.userService.register(userObj, userPassword)
      .pipe(first())
      .subscribe(
        () => {
        this.authenticationService.login(userEmail, userPassword).subscribe(() => {
          let brand = new BrandDto();
          brand.name = this.registerForm.value.name;
         this.irewardapiService.createBrand(brand).subscribe(()=> {
            this.router.navigate(['/']);
          });
        });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
      });
    }
}
