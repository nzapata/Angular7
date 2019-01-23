import { Component, OnInit } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { IrewardApiService } from '../../_services/ireward-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { SendTokenDto } from '../../_models/sendTokenDto';
import { TokenDto } from '../../_models/tokenDto';
import { CustomerDto } from '../../_models/customerDto';
import { BalanceService } from "../../_services/balance.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-send-individual',
  templateUrl: './send-individual.component.html',
  styleUrls: ['./send-individual.component.css']
})
export class SendIndividualComponent implements OnInit {
  sendIndividualForm: FormGroup;
  loading = false;
  submitted = false;
  tokens: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private irewardapiService: IrewardApiService,
    private alertService: AlertService,
    private balanceService: BalanceService

  ) { }

  ngOnInit() {
    let currentCustomer : CustomerDto = JSON.parse(localStorage.getItem('currentCustomer'));
    this.balanceService.getBalances(currentCustomer.publicKeyHex)
      .take(1)
      .flatMap<any, string[]>(balance => {
        console.log("balance=", balance);
        if (balance && balance.assetV2 && balance.assetV2.length > 0) {
          let nameList: string[] = [];
          balance.assetV2.forEach(x => {
            nameList.push(x.key);
          });
          return of<string[]>(nameList);
        } else {
          this.tokens = [];
          return empty();
        }
      })
      .flatMap<string[], TokenDto[]>(nameList => {
        return this.irewardapiService.getTokensFromTronTokenIdList(nameList);
      })
      .subscribe(tokenDtoList => {
        this.tokens = [];
        if (tokenDtoList && tokenDtoList.length > 0) {
          tokenDtoList.forEach(tokenDto => {
            this.tokens.push({ id: tokenDto.id, name: tokenDto.name });
          });
        }
      }
    );


    this.tokens = [];
    this.sendIndividualForm = this.formBuilder.group({
      amount: ['', Validators.required ],
      sendTo: ['', Validators.required],
      tokenId: [null, Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.sendIndividualForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.sendIndividualForm.invalid) {
      return;
    }

    this.loading = true;
    const sendtoken = new SendTokenDto();

    sendtoken.quantity = this.sendIndividualForm.value.amount;
    sendtoken.toBase58 = this.sendIndividualForm.value.sendTo;
    sendtoken.tokenId = this.sendIndividualForm.value.tokenId;

    this.irewardapiService.sendToken(sendtoken).subscribe(result => {
      if (result.result) {
        this.alertService.success(result.note);
      } else {
        this.alertService.error(result.note);
      }
    },
      error => {
        this.alertService.error(error);
      });

    /*Todo create services to send token and dropdown to get current token*/

    // this.irewardapiService.sendToken(sendtoken).subscribe(data => {
    //     if (data.result ) {
    //       this.alertService.success('Token Send Successful');
    //     } else {
    //       this.alertService.error('Unable to send Token');
    //     }
    //   },
    //   error => {
    //     this.alertService.error(error);
    //     this.loading = false;
    //   });
  }

}
