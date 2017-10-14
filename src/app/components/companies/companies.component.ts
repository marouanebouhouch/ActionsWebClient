import {Component, Input, OnInit, Output} from '@angular/core';
import {Company} from '../../interfaces/company';
import {CompanyService} from '../../services/company.service';
import {TagService} from '../../services/tag.service';
import {ActivatedRoute, Router} from '@angular/router';

declare var UIkit: any;

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  companies: Company[];
  p = 1;
  @Output() selectedCompany: number;

  constructor(private companyService: CompanyService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.selectedCompany = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.getCompanies().subscribe(response => this.companies = response);
  }

  selectCompany(company_id: number) {
    this.selectedCompany = company_id;
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
