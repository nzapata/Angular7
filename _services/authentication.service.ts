import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { User } from '../_models/user';
import { AuthenticationDto } from '../_models/authenticationDto';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router, @Inject('API_URL') private apiUrl: string) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const authDto = new AuthenticationDto({email: email, password: password});
    return this.http.post<any>(`${this.apiUrl}/Account/GetAuthToken`, authDto)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentBrand');
    localStorage.removeItem('currentCustomer');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getAuthStatus() : Observable<string> {
    return this.http.get < { result: string, userName: string}>(`${this.apiUrl}/Account/GetPrivateResponse`).pipe<string>(map(response => { return response.result}));
  }
}
