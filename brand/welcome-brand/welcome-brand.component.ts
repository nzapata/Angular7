import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { User } from "../../_models/user";
import { AuthenticationService } from "../../_services/authentication.service";
import {BrandDto} from '../../_models/brandDto';


@Component({
  selector: "welcome-brand",
  templateUrl: "./welcome-brand.html",
  styleUrls: ["./welcome-brand.css"]
})
export class WelcomeBrandComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentBrand:BrandDto;
  currentUserSubscription: Subscription;
  users: User[] = [];
  authStatus: string;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      this.currentBrand = JSON.parse(localStorage.getItem('currentBrand'));
    });
  }

  ngOnInit() {
    this.authenticationService.getAuthStatus().subscribe(status => { this.authStatus = status });
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

}
