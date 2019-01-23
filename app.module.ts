import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeBrandComponent } from './brand/welcome-brand/welcome-brand.component';
import { AlertComponent } from './alert/alert.component';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SignUpBrandComponent } from './brand/sign-up-brand/sign-up-brand.component';
import { SignUpIndividualComponent } from './individual/sign-up-individual/sign-up-individual.component';
import { SignUpComponent } from './_shared/sign-up/sign-up.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { CreateTokenComponent } from './brand/create-token/create-token.component';
import { IndividualDashboardComponent } from './individual/individual-dashboard/individual-dashboard.component';
import { DistributedComponent } from './brand/distributed/distributed.component';
import { WelcomeIndividualComponent } from './individual/welcome-individual/welcome-individual.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BrandDashboardComponent } from './brand/brand-dashboard/brand-dashboard.component';
import { NavIndividualComponent } from './_shared/nav-individual/nav-individual.component';
import { SendIndividualComponent } from './individual/send-individual/send-individual.component';
import { ReceivedIndividualComponent } from './individual/received-individual/received-individual.component';
import { CodeGeneratorComponent } from './brand/code-generator/code-generator.component';
import { NavBrandComponent } from './_shared/nav-brand/nav-brand.component';
import { ClipboardModule } from 'ngx-clipboard';
import { AgGridModule } from 'ag-grid-angular';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BrandRecievedComponent } from './brand/brand-recieved/brand-recieved.component';
import { BrandSendComponent } from './brand/brand-send/brand-send.component';
import { IndividualExploreComponent } from './individual/individual-explore/individual-explore.component';
import { ExploreComponent } from './explore/explore.component';
import { BrandTokenrequirementsComponent} from './brand/brand-tokenrequirements/brand-tokenrequirements.component';
import { BrandCampaignComponent } from './brand/brand-campaign/brand-campaign.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeBrandComponent,
    AlertComponent,
    SignUpBrandComponent,
    SignUpIndividualComponent,
    SignUpComponent,
    CreateTokenComponent,
    IndividualDashboardComponent,
    DistributedComponent,
    WelcomeIndividualComponent,
    ForgotPasswordComponent,
    BrandDashboardComponent,
    NavIndividualComponent,
    SendIndividualComponent,
    ReceivedIndividualComponent,
    CodeGeneratorComponent,
    NavBrandComponent,
    BrandRecievedComponent,
    BrandSendComponent,
    IndividualExploreComponent,
    ExploreComponent,
    BrandCampaignComponent,
    BrandTokenrequirementsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    ClipboardModule,
    NgxQRCodeModule,
    HttpClientModule,
    AppRoutingModule,
    ShowHidePasswordModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AgGridModule.withComponents([]),


  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
