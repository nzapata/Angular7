import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AlertService } from '../../_services/alert.service';
import { IrewardApiService } from '../../_services/ireward-api.service';
import {CampaignDto} from '../../_models/campaignDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-distributed',
  templateUrl: './distributed.component.html',
  styleUrls: ['./distributed.component.css']
})
export class DistributedComponent implements OnInit {
  campaignForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private irewardapiService: IrewardApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.campaignForm = this.formBuilder.group({
      purchases: [''],
      campaignName: ['', Validators.required],
      tokenPerRedemptionCode: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.campaignForm.controls; }

  onSubmit() {

    this.submitted = true;
    // stop here if form is invalid
    if (this.campaignForm.invalid) {
      return;
    }

    this.loading = true;
    const campaign = new CampaignDto();
    campaign.type = "purchases";//this.campaignForm.value.purchases;
    campaign.name= this.campaignForm.value.campaignName;
    campaign.quantity = this.campaignForm.value.tokenPerRedemptionCode;

    this.irewardapiService.getSelectedBrand().subscribe(brandId => {
        campaign.brandId = brandId;
      this.irewardapiService.createCampaign(campaign).subscribe(returnedCampaignDto => {
        if (returnedCampaignDto.id > 0) {
          console.log("createCampaign data=", returnedCampaignDto);
          this.router.navigate(['/brand/codegenerator']);
        } else
          this.alertService.error("Campaign was not created.");
      });
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });

  }
}
