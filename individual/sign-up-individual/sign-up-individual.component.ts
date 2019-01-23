import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_models/user';
import { IrewardApiService } from '../../_services/ireward-api.service';
import { CustomerDto } from '../../_models/customerDto';

@Component({
  selector: 'app-sign-up-individual',
  templateUrl: './sign-up-individual.component.html',
  styleUrls: ['./sign-up-individual.component.css']
})
export class SignUpIndividualComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private irewardapiService: IrewardApiService,
  ) {
    // redirect to welcome-brand if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
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
        data => {
          this.authenticationService.login(userEmail, userPassword).subscribe(() => {
            let customer = new CustomerDto();
            customer.name = this.registerForm.value.name;
              this.irewardapiService.createCustomer(customer).subscribe(() => {
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



