import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../_services/alert.service';
import { IrewardApiService } from '../../_services/ireward-api.service';
import { CreateRedemptionCodesDto } from '../../_models/CreateRedemptionCodesDto';
import {Router} from '@angular/router';



@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.css']
})
export class CodeGeneratorComponent implements OnInit {
  redemptionCodesForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private irewardapiService: IrewardApiService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.redemptionCodesForm = this.formBuilder.group({
      quantity: [10, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.redemptionCodesForm.controls; }

  onSubmit() {
    this.loading = true;

    this.submitted = true;
    // stop here if form is invalid
    if (this.redemptionCodesForm.invalid) {
      return;
    }

    const createRedemptionCodesDto = new CreateRedemptionCodesDto();
    createRedemptionCodesDto.quantity = this.redemptionCodesForm.value.quantity;
   
    this.irewardapiService.geCampaignByBrand().subscribe(data => {
      createRedemptionCodesDto.campaignId = data.id;
         this.irewardapiService.createRedemptionCodes(createRedemptionCodesDto).subscribe(result => {
           console.log("code-generator createRedemptionCodes result=", result);

           this.loading = false;
           this.router.navigate(['/brand/dashboard']);
     });
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
