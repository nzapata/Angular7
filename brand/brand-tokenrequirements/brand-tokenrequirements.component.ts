import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalanceService } from '../../_services/balance.service';
import { AlertService } from "../../_services/alert.service";
import { BrandDto } from '../../_models/brandDto';
import { Router } from '@angular/router';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-brand-tokenrequirements',
  templateUrl: './brand-tokenrequirements.component.html',
  styleUrls: ['./brand-tokenrequirements.component.css']
})
export class BrandTokenrequirementsComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  elementType = 'url';
  currentBrand: BrandDto;
  currentTrxBalanace: string = 'calculating...';
  balanceSubscription: ISubscription;
  haveEnough: boolean = false;
  warnedOnce: boolean = false;
  constructor(private balanceService: BalanceService, private router: Router, private alertService: AlertService) { }
  publicKey: string;
  getTrxUrl: string = 'https://old.changelly.com/exchange/USD/TRX/60?ref_id=f9jeitdbuvmypq4h';
 
  ngOnInit() {
    this.balanceService.getUrlFromWhichToGetTrx().subscribe(
      x => {
        this.getTrxUrl = x;
      },
      error => {
        this.getTrxUrl = 'https://old.changelly.com/exchange/USD/TRX/60?ref_id=f9jeitdbuvmypq4h';
      console.log(error);
    });
    const currentBrand: BrandDto = JSON.parse(localStorage.getItem('currentBrand'));
    this.publicKey = currentBrand.publicKeyBase58;
    this.balanceSubscription = this.balanceService.getBalances(currentBrand.publicKeyHex).subscribe(balance => {
      console.log("balance=", balance);
      if (balance && balance.balance && balance.balance > 0) {
        this.currentTrxBalanace = `${balance.balance / 1000000}`;
        if ((balance.balance / 1000000) >= 1024) {
          this.haveEnough = true;
        }
      } else {
        this.currentTrxBalanace = '0';
      }
    },
      error => {
        console.log("brand-tokenrequirements error=", error);
        this.currentTrxBalanace = 'unknown';
      }
    );
  }

  checkbalance() {
    this.loading = true;
    if (this.haveEnough) {
      this.router.navigate(['/brand/createtoken']);
    } else {
      if (this.warnedOnce) {
        this.router.navigate(['/brand/createtoken']);
      } else {
        this.warnedOnce = true;
        this.alertService.error("You don't have enough TRX to create a token");
      }
    }
    this.loading = false;
  }

  ngOnDestroy() {
    this.balanceSubscription.unsubscribe();
  }

}
