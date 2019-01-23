import { Component, OnInit } from '@angular/core';
import { BrandDto } from '../../_models/brandDto';

@Component({
  selector: 'app-brand-recieved',
  templateUrl: './brand-recieved.component.html',
  styleUrls: ['./brand-recieved.component.css']
})
export class BrandRecievedComponent implements OnInit {
  currentBrand: BrandDto;
  elementType = 'url';
  constructor() {
    this.currentBrand = JSON.parse(localStorage.getItem('currentBrand'));
  }

  ngOnInit() {

  }

}
