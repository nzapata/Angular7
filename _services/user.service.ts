import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { AuthenticationDto } from '../_models/authenticationDto'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  register(user: User, password: string) : Observable<User> {
    const authDto = new AuthenticationDto({ email: user.username, password: password });
    return this.http.post<User>(`${this.apiUrl}/Account/Register`, authDto);
  }

}
