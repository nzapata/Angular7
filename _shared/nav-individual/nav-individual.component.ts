import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-nav-individual',
  templateUrl: './nav-individual.component.html',
  styleUrls: ['./nav-individual.component.css']
})
export class NavIndividualComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService ) { }

  ngOnInit() {
  }
  logout() {
    this.authenticationService.logout();
  }
}
