import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../../interfaces/company';
import {CompanyService} from '../../services/company.service';
import {OperationService} from '../../services/operation.service';
import {Operation} from '../../interfaces/operation';
import {Tag} from '../../interfaces/tag';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
})
export class OperationsComponent implements OnInit {

  company: Company;
  buys: Operation;
  sells: Operation;
  tags: Tag[];
  p = 1;
  operations = 's';
  constructor(private route: ActivatedRoute, private companyService: CompanyService, private operationService: OperationService, private tagService: TagService) { }

  ngOnInit() {
    const company_id = Number(this.route.snapshot.paramMap.get('id'));
    this.companyService.getCompany(company_id)
      .then(response => this.company = response);
    this.tagService.getTagsByCompany(company_id)
      .then(response => this.tags = response);
    this.operationService.getBuysByCompany(company_id)
      .then(response => this.buys = response);
    this.operationService.getSellsByCompany(company_id)
      .then(response => this.sells = response);
  }

  changeOps(o: string) {
    this.operations = o;
    this.p = 1;
  }
}
