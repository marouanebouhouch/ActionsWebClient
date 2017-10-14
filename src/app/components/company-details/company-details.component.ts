import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Company} from '../../interfaces/company';
import {Tag} from '../../interfaces/tag';
import {TagService} from '../../services/tag.service';
import {CompanyService} from '../../services/company.service';
import {Http} from '@angular/http';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit, OnChanges {

  @Input() company_id: number;
  @Output() toDelete = new EventEmitter<Company>();
  tags: Tag[];
  company: Company;
  constructor(private tagsService: TagService, private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getCompany(this.company_id)
      .then(response => this.company = response);
    this.tagsService.getTagsByCompany(this.company_id)
      .then(response => console.log(response));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.company_id) {
      this.tagsService.getTagsByCompany(changes['company_id'].currentValue)
        .then(response => this.tags = response);
      this.companyService.getCompany(changes['company_id'].currentValue)
        .then(response => this.company = response);
    }
  }

  deleteCompany(company: Company) {
    this.toDelete.emit(company);
  }

  removeTagFromCompany(company: Company, tag: Tag) {
    this.companyService.removeTagFromCompany(company.id, tag.id)
      .then(() => {
        this.tags = this.tags.filter(t => t !== tag);
      });
  }
}
