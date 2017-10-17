import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CompaniesComponent} from '../components/companies/companies.component';
import {NewCompanyComponent} from '../components/new-company/new-company.component';
import {OperationsComponent} from '../components/operations/operations.component';
import {UpdateCompanyComponent} from '../components/update-company/update-company.component';

const routes: Routes = [
  { path: 'companies/all/:id', component: CompaniesComponent},
  { path: 'companies/update/:id', component: UpdateCompanyComponent},
  { path: 'operations/:id', component: OperationsComponent},
  { path: 'companies/all', component: CompaniesComponent},
  { path: 'companies/new', component: NewCompanyComponent},
  { path: '',   redirectTo: '/companies/all', pathMatch: 'full' },
  { path: '**',   redirectTo: '/companies/all', pathMatch: 'full' },
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
