import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompaniesComponent} from '../components/companies/companies.component';
import {NewCompanyComponent} from '../components/new-company/new-company.component';

const routes: Routes = [
  { path: 'companies/all/{}', component: CompaniesComponent},
  { path: 'companies/new', component: NewCompanyComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
