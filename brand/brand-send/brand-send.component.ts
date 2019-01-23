import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/alert.service';
import { UserService } from '../../_services/user.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { IrewardApiService } from '../../_services/ireward-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { SendTokenDto } from '../../_models/sendTokenDto';


@Component({
  selector: 'app-brand-send',
  templateUrl: './brand-send.component.html',
  styleUrls: ['./brand-send.component.css']
})
export class BrandSendComponent implements OnInit {

  sendbrandForm: FormGroup;
  loading = false;
  submitted = false;
  tokens: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private irewardapiService: IrewardApiService,
    private alertService: AlertService

  ) { }

  ngOnInit() {
    this.tokens = [
      { id: 1, name: 'Vilnius' },
      { id: 2, name: 'Kaunas' },
      { id: 3, name: 'Pavilnys'},
      { id: 4, name: 'Pabradė' },
      { id: 5, name: 'Klaipėda' }
    ];
    this.sendbrandForm = this.formBuilder.group({
      amount: ['', Validators.required ],
      sendTo: ['', Validators.required ],

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.sendbrandForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.sendbrandForm.invalid) {
      return;
    }

    this.loading = true;
    const sendtoken = new SendTokenDto();

    sendtoken.quantity = this.sendbrandForm.value.amount;
    sendtoken.toBase58 = this.sendbrandForm.value.sendTo;


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
