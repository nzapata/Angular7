import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeBrandComponent } from './brand/welcome-brand/welcome-brand.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomeGuard } from './_guards/home.guard';
import { HomeComponent } from './home/home.component';
import { BrandGuard } from './_guards/brand.guard';
import { LoginComponent } from './login/login.component';
import { SignUpIndividualComponent } from './individual/sign-up-individual/sign-up-individual.component';
import { SignUpBrandComponent} from './brand/sign-up-brand/sign-up-brand.component';
import { CreateTokenComponent} from './brand/create-token/create-token.component';
import { IndividualDashboardComponent } from './individual/individual-dashboard/individual-dashboard.component';
import { DistributedComponent } from './brand/distributed/distributed.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BrandDashboardComponent } from './brand/brand-dashboard/brand-dashboard.component';
import { WelcomeIndividualComponent } from './individual/welcome-individual/welcome-individual.component';
import { SendIndividualComponent } from './individual/send-individual/send-individual.component';
import { ReceivedIndividualComponent } from './individual/received-individual/received-individual.component';
import { CodeGeneratorComponent } from './brand/code-generator/code-generator.component';
import { BrandRecievedComponent } from './brand/brand-recieved/brand-recieved.component';
import { BrandSendComponent } from './brand/brand-send/brand-send.component';
import { BrandCampaignComponent } from './brand/brand-campaign/brand-campaign.component';
import { BrandTokenrequirementsComponent } from './brand/brand-tokenrequirements/brand-tokenrequirements.component';



const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard, HomeGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signupbrand', component: SignUpBrandComponent },
  { path: 'signupindividual', component: SignUpIndividualComponent },
  {
    path: 'brand',
    canActivate: [AuthGuard, BrandGuard],
    children: [
      {path: 'welcome', component: WelcomeBrandComponent},
      {path: 'createtoken', component: CreateTokenComponent},
      {path: 'createcampaign', component: DistributedComponent},
      {path: 'codegenerator', component: CodeGeneratorComponent},
      {path: 'receivetoken', component: BrandRecievedComponent},
      {path: 'sendtoken', component: BrandSendComponent},
      {path: 'dashboard', component: BrandDashboardComponent},
      { path: 'campaign', component: BrandCampaignComponent },
      { path: 'tokenrequirements', component: BrandTokenrequirementsComponent },
    ]
  },

  {path: 'individual-dashboard', component: IndividualDashboardComponent},
  {path: 'nav-individual', component: IndividualDashboardComponent},
  {path: 'welcome-individual', component: WelcomeIndividualComponent},
  {path: 'individual-send', component: SendIndividualComponent},
  {path: 'individual-received', component: ReceivedIndividualComponent},

  // Todo design
  {path: 'forgot-password', component: ForgotPasswordComponent},

  // otherwise redirect to welcome-brand
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
