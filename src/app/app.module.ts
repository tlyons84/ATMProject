import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {ButtonModule} from 'primeng/button';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { RecieptComponent } from './reciept/reciept.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ATMTrackingService } from './services/ATM-Tracking.service';
import { DataStoreService } from './services/data-store.service';
import { FormBuilderService } from './services/Form-Builder.service';
import { DepositeComponent } from './deposite/deposite.component';
import { FormBuilder } from '@angular/forms';
import { HistoryComponent } from './history/history.component';
import { RestockComponent } from './restock/restock.component';
import { ATMHistory } from './services/ATM-History.service';
import { UserProfileService } from './services/user-profile.service';
import {TableModule} from 'primeng/table'
import {MultiSelectModule} from 'primeng/multiselect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {CardModule} from 'primeng/card';
import { SubjectService } from './services/subject.service';
import {InputMaskModule} from 'primeng/inputmask';
import {InputNumberModule} from 'primeng/inputnumber';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    WithdrawalComponent,
    WelcomeScreenComponent,
    RecieptComponent,
    UserProfileComponent,
    DepositeComponent,
    HistoryComponent,
    RestockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MultiSelectModule,
    BrowserAnimationsModule,
    CardModule,
    InputMaskModule,
    InputNumberModule
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [ATMTrackingService, DataStoreService, FormBuilderService, FormBuilder, ATMHistory, UserProfileService,SubjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
