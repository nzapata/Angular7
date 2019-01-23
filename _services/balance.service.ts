import { Injectable, Inject } from '@angular/core';
import { BalanceItem } from '../_models/balanceItem';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  constructor(private http: HttpClient, @Inject('API_URL') private apiUrl: string) { }

  getBalances(accountHex: string): Observable<any> {
    return this.getTronUrl().flatMap<string, any>(
      tronUrl => {
        console.log("getBalances tronUrl=", tronUrl);
        return timer(0, 5 * 1000)
          .pipe()
          .flatMap(() => {
            if (tronUrl && tronUrl.startsWith("http://")) {
              return this.http.get<any>(`${this.apiUrl}/PassThru/GetBalanceByPublicKeyBase58/${accountHex}`);
            } else {
              return this.http.post<any>(`${tronUrl}/wallet/getaccount`, { address: accountHex });
            }
          });
      }
    );
  }

  private getTronUrl(): Observable<string> {
    return this.http.get<{ fullNodeUrl: string }>(`${this.apiUrl}/Environment/Get`)
      .map<{ fullNodeUrl: string }, string>(
        environmentDto => environmentDto.fullNodeUrl,
        err => console.log(err)
        );
  }

  getUrlFromWhichToGetTrx(): Observable<string> {
    return this.http.get<{ getTrxUrl: string }>(`${this.apiUrl}/Environment/Get`)
      .map<{ getTrxUrl: string }, string>(
        environmentDto => environmentDto.getTrxUrl,
        err => console.log(err)
      );
  }
}
