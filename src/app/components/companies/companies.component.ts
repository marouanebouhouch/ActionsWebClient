import {Component, Input, OnInit, Output} from '@angular/core';
import {Company} from '../../interfaces/company';
import {CompanyService} from '../../services/company.service';
import {TagService} from '../../services/tag.service';

declare var UIkit: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies: Company[];
  p = 1;
  @Output() selectedCompany: Company;
  constructor(private companyService: CompanyService, private tagsService: TagService) {}

  ngOnInit() {
    this.companyService.getCompanies().then(response => this.companies = response);
  }

  selectCompany(company: Company) {
    this.selectedCompany = company;
  }

  deleteCompany(company: Company) {
    UIkit.modal.confirm('Are you sure to delete the company?').then(function() {
      this.companyService.deleteCompany(company.id)
        .then(() => {
          this.companies = this.companies.filter(c => c !== company);
          this.selectedCompany = null;
        });
    }.bind(this), function () {});
  }
}
