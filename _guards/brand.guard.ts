import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Router, UrlTree } from "@angular/router";
import { TokenDto } from '../_models/TokenDto';
import { CampaignDto } from '../_models/campaignDto';
import { BrandDto } from '../_models/brandDto';
import { RedemptionCodeDto } from '../_models/redemptionCodeDto';
import { IrewardApiService } from "../_services/ireward-api.service";
import { BalanceService } from "../_services/balance.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class BrandGuard implements CanActivate {

  constructor(
    private router: Router,
    private irewardapiService: IrewardApiService,
    private balanceService: BalanceService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean|UrlTree> {
    return this.irewardapiService.getTokenByBrand().flatMap<TokenDto[], boolean|UrlTree>(tokens => {
      if (state.url === "/brand") {
        if (tokens.length > 0) {
          return this.irewardapiService.geCampaignByBrand().flatMap<CampaignDto, UrlTree>(campaignDto => {
            if (campaignDto) {
              return this.irewardapiService.getGetRedeemCodeByCampaign(campaignDto.id)
                .flatMap<RedemptionCodeDto[], UrlTree>(redemptionCodes => {
                  if (redemptionCodes.length > 0) {
                    return of<UrlTree>(this.router.parseUrl('/brand/dashboard'));
                  } else {
                    return of<UrlTree>(this.router.parseUrl('/brand/codegenerator'));
                  }
                });
            } else {
              return of<UrlTree>(this.router.parseUrl('/brand/createcampaign'));
            }
          });
        } else {
          const currentBrand: BrandDto = JSON.parse(localStorage.getItem('currentBrand'));
          return this.balanceService.getBalances(currentBrand.publicKeyHex).take(1).flatMap<any, UrlTree>(balance => {
            console.log("balance=", balance);
            if (balance && balance.balance && (balance.balance / 1000000) >= 1024) {
              return of<UrlTree>(this.router.parseUrl('/brand/createtoken'));
            } else {
              return of<UrlTree>(this.router.parseUrl('/brand/tokenrequirements'));
            }
          });
        }
      }
      return of<boolean>(true);
    });
  }
}
