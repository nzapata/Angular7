import { Component, OnInit } from '@angular/core';
import { IrewardApiService } from '../../_services/ireward-api.service';
import { RedemptionCodeDto } from '../../_models/redemptionCodeDto';
import { CampaignDto } from '../../_models/campaignDto';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-brand-campaign',
  templateUrl: './brand-campaign.component.html',
  styleUrls: ['./brand-campaign.component.css']
})
export class BrandCampaignComponent implements OnInit {
  redemptionCodes: RedemptionCodeDto[] ;
  constructor(private irewardapiService: IrewardApiService) { }

  ngOnInit() {
    this.irewardapiService.geCampaignByBrand().flatMap<CampaignDto, RedemptionCodeDto[]>(campaignDto => {
      return this.irewardapiService.getGetRedeemCodeByCampaign(campaignDto.id);
    }).subscribe(redemptionCodes => {
      this.redemptionCodes = redemptionCodes;
    });
  }

}
