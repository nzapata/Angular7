import { Component, OnInit, OnDestroy } from '@angular/core';
import { BalanceService } from '../../_services/balance.service';
import {CustomerDto} from '../../_models/customerDto';
import { ISubscription } from "rxjs/Subscription";
import { IrewardApiService } from "../../_services/ireward-api.service";

// @ts-ignore
@Component({
  selector: 'app-individual-dashboard',
  templateUrl: './individual-dashboard.component.html',
  styleUrls: ['./individual-dashboard.component.css']
})
export class IndividualDashboardComponent implements OnInit, OnDestroy {
  balanceSubscription: ISubscription;
  tokens: {name: string, price: number}[] = [{ name: 'counting...', price: 0}];
  currentCustomer: CustomerDto;
  totalTokens: string = 'calculating...';

  constructor(private balanceService: BalanceService, private irewardApiService: IrewardApiService) { }

  ngOnInit() {
    this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    this.balanceSubscription = this.balanceService.getBalances(this.currentCustomer.publicKeyHex).subscribe(balance => {
      console.log("balance=", balance);
      //this.availableTrx = `${balance.balance / 1000000}`;
      let totalTokensCount = 0;
      if (balance && balance.assetV2 && balance.assetV2.length > 0) {
        let assetV2map = {};
        const assetV2TokenIdList = balance.assetV2.map(asset => {
          totalTokensCount += asset.value;
          assetV2map[asset.key] = asset.value;
          return asset.key;
        });
        this.irewardApiService.getTokensFromTronTokenIdList(assetV2TokenIdList).subscribe(tokenDtos => {
          this.tokens = tokenDtos.map(tokenDto => {
            return { name: tokenDto.name, price: assetV2map[tokenDto.tronTokenId] };
          });
        });
      } else {
        this.tokens[0].name = '[NO TOKENS]';
      }
      this.totalTokens = ''+totalTokensCount;
    });
  }

  ngOnDestroy() {
    this.balanceSubscription.unsubscribe();
  }

}
