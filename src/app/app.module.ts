import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CompaniesComponent } from './components/companies/companies.component';
import {CompanyService} from './services/company.service';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {HttpModule} from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import {TagService} from './services/tag.service';
import { AgmCoreModule } from '@agm/core';
import { NewCompanyComponent } from './components/new-company/new-company.component';


@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CompanyDetailsComponent,
    NewCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBbJ88RITpYfSuYe8RPxDK1xyHl77BoD_Y'
    })
  ],
  providers: [CompanyService, TagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
