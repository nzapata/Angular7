import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalanceService } from '../../_services/balance.service';
import { IrewardApiService } from "../../_services/ireward-api.service";
import { BrandDto } from '../../_models/brandDto';
import { CampaignDto } from '../../_models/campaignDto';
import { Router } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-brand-dashboard',
  templateUrl: './brand-dashboard.component.html',
  styleUrls: ['./brand-dashboard.component.css']
})
export class BrandDashboardComponent implements OnInit, OnDestroy {
  balanceSubscription: ISubscription;
  currentBrand: BrandDto;
  campaigns: CampaignDto[];
  availableTrx: string = "calculating...";
  availableToken: { quantity: string, name: string } = {quantity: "calculating...", name: ""};

  constructor(private balanceService: BalanceService, private router: Router,private irewardApiService: IrewardApiService) {
    this.currentBrand = JSON.parse(localStorage.getItem('currentBrand'));

    this.irewardApiService.geCampaignsByBrand().subscribe(data => {
        this.campaigns = data;
      });
  }

  ngOnInit() {
    this.irewardApiService.getBrandByUser().subscribe(brand => {
      this.balanceSubscription = this.balanceService.getBalances(brand[0].publicKeyHex).subscribe(balance => {
        console.log("balance=", balance);
        if (balance && balance.balance && balance.balance > 0) {
          this.availableTrx = `${balance.balance / 1000000}`;
        } else {
          this.availableTrx = '0';
        }
        if (balance && balance.assetV2 && balance.assetV2.length > 0) {
          this.irewardApiService.getTokensFromTronTokenIdList([balance.assetV2[0].key]).subscribe(tokenDtos => {
            this.availableToken = { quantity: balance.assetV2[0].value, name: tokenDtos[0].name };
          });
        }
      },
        error => {
          console.log("BrandDashboardComponent getBalances error=", error);
          this.availableTrx = 'unknown';
        });
    });
  }

  campaignFunction():void {
    this.router.navigate(['/brand/campaign']);
  }

  ngOnDestroy() {
    this.balanceSubscription.unsubscribe();
  }

}
