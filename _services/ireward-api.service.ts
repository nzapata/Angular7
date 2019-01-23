import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrandDto } from '../_models/brandDto';
import { Observable, of } from 'rxjs';
import { CustomerDto } from '../_models/customerDto';
import { TokenDto } from '../_models/TokenDto';
import { Router } from '@angular/router';
import { CampaignDto } from '../_models/campaignDto';
import { RedeemCodeRequestDto } from '../_models/redeemCodeRequestDto';
import { CreateRedemptionCodesDto } from '../_models/createRedemptionCodesDto';
import { RedemptionCodeDto } from '../_models/redemptionCodeDto';
import { RedeemCodeResultDto } from '../_models/redeemCodeResultDto';
import { SendTokenDto } from '../_models/sendTokenDto';

@Injectable({
  providedIn: 'root'
})
export class IrewardApiService {
  constructor(private http: HttpClient, private router: Router, @Inject('API_URL') private apiUrl: string) { }
  private selectedBrandId: number;


  createBrand(brand: BrandDto): Observable<BrandDto> {
    return this.http.post<BrandDto>(`${this.apiUrl}/Brand/Create`, brand);
  }

  reedemCode(redeemCode: RedeemCodeRequestDto): Observable<RedeemCodeResultDto> {
    return this.http.post<RedeemCodeResultDto>(`${this.apiUrl}/brand/RedeemCode`, redeemCode);
  }


  createRedemptionCodes(createRedemptionCodesDto: CreateRedemptionCodesDto): Observable<RedemptionCodeDto[]> {
    return this.http.post<RedemptionCodeDto[]>(`${this.apiUrl}/Brand/CreateRedemptionCodes`, createRedemptionCodesDto)
      .pipe(response => {
        console.log('response', response);
        return response;
      });
  }

  createCampaign(campaign: CampaignDto): Observable<CampaignDto> {
    return this.http.post<CampaignDto>(`${this.apiUrl}/Brand/CreateCampaign`, campaign);
  }

  createToken(token: TokenDto): Observable< number > {
    return this.http.post<number>(`${this.apiUrl}/Brand/CreateToken`, token);
  }

  createCustomer(customer: CustomerDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(`${this.apiUrl}/Customer/Create`, customer);
  }

  getBrandByUser(): Observable<BrandDto[]> {
    return this.http.get<BrandDto[]>(`${this.apiUrl}/Brand/GetByUserId`);
  }

  getGetRedeemCodeByCampaign(campaign: number): Observable<RedemptionCodeDto[]> {
    return this.http.get<RedemptionCodeDto[]>(`${this.apiUrl}/Brand/GetRedeemCodeByCampaign/` + campaign);
  }


  getCustomerByUser(): Observable<CustomerDto[]> {
    return this.http.get<CustomerDto[]>(`${this.apiUrl}/Customer/GetByUserId`);
  }

  setSelectedBrand(brandId: number): void {
    localStorage.setItem('selectedBrandId', JSON.stringify(brandId));
  }

  getTokenByBrand(): Observable<TokenDto[]> {
    return this.http.get<TokenDto[]>(`${this.apiUrl}/Brand/GetTokenByBrand/` + localStorage.getItem('selectedBrandId'));
  }

  geCampaignByBrand(): Observable<CampaignDto> {
    return this.http.get<CampaignDto>(`${this.apiUrl}/Brand/GetCampaignByBrand/` + localStorage.getItem('selectedBrandId'));
  }
  geCampaignsByBrand(): Observable<CampaignDto[]> {
    return this.http.get<CampaignDto[]>(`${this.apiUrl}/Brand/GetCampaignsByBrand/` + localStorage.getItem('selectedBrandId'));
  }


  getSelectedBrand(): Observable<number> {
    if (this.selectedBrandId < 1) {
      this.router.navigate(['/']);
    } else {
      return of(JSON.parse(localStorage.getItem('selectedBrandId')));
    }
  }

  sendToken(sendTokenDto: SendTokenDto): Observable<RedeemCodeResultDto> {
    return this.http.post<RedeemCodeResultDto>(`${this.apiUrl}/Customer/SendToken`, sendTokenDto);
  }

  getTokensFromNameList(nameList: string[]): Observable<TokenDto[]> {
    return this.http.post<TokenDto[]>(`${this.apiUrl}/Customer/GetTokensFromNameList`, nameList);
  }

  getTokensFromTronTokenIdList(tronTokenIdList: string[]): Observable<TokenDto[]> {
    return this.http.post<TokenDto[]>(`${this.apiUrl}/Customer/GetTokensFromTronTokenIdList`, tronTokenIdList);
  }

}
