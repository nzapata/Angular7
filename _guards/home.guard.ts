import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Router, UrlTree } from "@angular/router";
import { IrewardApiService } from "../_services/ireward-api.service";
import { forkJoin } from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private router: Router,
    private irewardApiService: IrewardApiService
  ) {}

  canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot)
    : Observable<boolean|UrlTree> | Promise<boolean> | boolean
  {
    const brandObs = this.irewardApiService.getBrandByUser();
    const customerObs = this.irewardApiService.getCustomerByUser();
    return forkJoin([brandObs, customerObs]).flatMap<any, boolean|UrlTree>(results => {
      if (results[0].length === 0 && results[1].length === 0) {
        return of<UrlTree>(this.router.parseUrl('signupbrand'));
      }
      if (results[0].length > 0 && results[1].length === 0) {
        this.irewardApiService.setSelectedBrand(results[0][0].id);
        localStorage.setItem("currentBrand", JSON.stringify(results[0][0]));
        return of<UrlTree>(this.router.parseUrl('/brand'));
      }
      if (results[0].length === 0 && results[1].length > 0) {
        localStorage.setItem("currentCustomer", JSON.stringify(results[1][0]));
        return of<UrlTree>(this.router.parseUrl('/welcome-individual'));
      }
      return of<boolean>(true);
    });
  }
}
