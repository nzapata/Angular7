import { Component, OnInit } from '@angular/core';
import { CustomerDto } from '../../_models/customerDto';

@Component({
  selector: 'app-received-individual',
  templateUrl: './received-individual.component.html',
  styleUrls: ['./received-individual.component.css']
})
export class ReceivedIndividualComponent implements OnInit {

  elementType = 'url';
  publicKey = 'getting public key...';
  currentCustomer: CustomerDto;
  constructor() { }

  ngOnInit() {
    this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    if (this.currentCustomer) {
      this.publicKey = this.currentCustomer.publicKeyBase58;
    } else {
      this.publicKey = 'Public key not found';
    }
  }

}
