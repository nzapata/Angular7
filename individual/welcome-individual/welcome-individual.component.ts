import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { IrewardApiService } from '../../_services/ireward-api.service';
import { RedeemCodeRequestDto} from '../../_models/redeemCodeRequestDto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerDto} from '../../_models/customerDto';

@Component({
  selector: 'app-welcome-individual',
  templateUrl: './welcome-individual.component.html',
  styleUrls: ['./welcome-individual.component.css']
})
export class WelcomeIndividualComponent implements OnInit {
  redemptionForm: FormGroup;
  currentCustomer: CustomerDto;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private irewardapiService: IrewardApiService,
    private alertService: AlertService
  ) {

    this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
  }

  ngOnInit() {

    this.redemptionForm = this.formBuilder.group({
      redemptionCode: [''],

    });

  }
  // convenience getter for easy access to form fields
  get f() { return this.redemptionForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.redemptionForm.invalid) {
      return;
    }

    this.loading = true;
    const redeemCode = new RedeemCodeRequestDto();
    redeemCode.redemptionCode = this.redemptionForm.value.redemptionCode;

    if (redeemCode.redemptionCode.trim() === '') {
      this.router.navigate(['/individual-dashboard']);
    } else {

    this.irewardapiService.reedemCode(redeemCode).subscribe(data => {
          if (data.result ) {
            this.router.navigate(['/individual-dashboard']);
          } else {
            this.alertService.error('Unable to redeemed code');
          }
        },
      error => {
        this.alertService.error('Unable to redeemed code');
        this.loading = false;
      });
    }


  }

}
