import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService } from '../../_services/alert.service';
import { IrewardApiService } from '../../_services/ireward-api.service';
import {TokenDto} from '../../_models/TokenDto';

@Component({
  selector: 'app-create-token',
  templateUrl: './create-token.component.html',
  styleUrls: ['./create-token.component.css']
})
export class CreateTokenComponent implements OnInit {
  createTokenForm: FormGroup;
  loading = false;
  submitted = false;
  tokenDtoList: TokenDto[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private irewardapiService: IrewardApiService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.createTokenForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
      abbreviation: ['', Validators.required],
      description: ['', Validators.required],
      url: ['https://', [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      totalSupply: ['', Validators.required],
      amount: ['', Validators.required]
    });

    //this.irewardapiService.getTokenByBrand().subscribe(data => {
    // if (data.length>0)
    //   this.router.navigate(['brand/createcampaign']);
    //});

  }

  // convenience getter for easy access to form fields
  get f() { return this.createTokenForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.createTokenForm.invalid) {
      return;
    }

    this.loading = true;
    const token = new TokenDto();
    token.name = this.createTokenForm.value.name;
    token.abbreviation = this.createTokenForm.value.abbreviation;
    token.description = this.createTokenForm.value.description;
    token.url = this.createTokenForm.value.url;
    token.trxRatio = 1;//this.createTokenForm.value.trxRatio;
    token.totalSupply = this.createTokenForm.value.totalSupply;
    token.freeBandwidth = 0;
    token.freeBandwidthLimit = 0;
    token.frozenAmount = 1;
    token.frozenDuration = 1;
    token.tokenRatio = 1;
    token.usdvalue = this.createTokenForm.value.amount;

    this.irewardapiService.getSelectedBrand().subscribe(brandId => {
        token.brandId = brandId;
        this.irewardapiService.createToken(token).subscribe(data => {
          if (data > 0 )
            this.router.navigate(['brand/createcampaign']);
          else
            this.alertService.error("Token was not created.");
        });
      },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
