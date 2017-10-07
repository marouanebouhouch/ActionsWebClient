import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Company} from '../../interfaces/company';
import {Tag} from '../../interfaces/tag';
import {TagService} from '../../services/tag.service';
import {CompanyService} from '../../services/company.service';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit, OnChanges {

  @Input() company: Company;
  @Output() toDelete = new EventEmitter<Company>();
  @Output() test: number;
  tags: Tag[];
  constructor(private tagsService: TagService, private companyService: CompanyService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.company) {
      this.tagsService.getTagsByCompany(changes['company'].currentValue)
        .then(response => this.tags = response);
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
