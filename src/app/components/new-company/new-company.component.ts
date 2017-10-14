import { Component, OnInit } from '@angular/core';
import {Tag} from '../../interfaces/tag';
import {TagService} from '../../services/tag.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../interfaces/company';
import {CompanyService} from '../../services/company.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {

  tags: Tag[];
  tagLabel: string;
  formGroup: FormGroup;
  newCompany: Company;
  newCompanyName: String;
  newCompanyAddress: String;
  newCompanyTurnover: number;
  newCompanyCeo: String;
  newCompanyCatchphrase: String;
  newCompanyLogo: String;
  newCompanyIndustry: String;
  newCompanyUrl: String;
  newCompanyLatitude = 0;
  newCompanyLongitude = 0;
  newCompanyTags: Tag[] = [];
  showTags = false;
  showMap = false;
  tagExists;

  constructor(private companyService: CompanyService, private tagService: TagService, private formBuilder: FormBuilder, private router: Router) {
    this.formGroup = formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'ceo': [],
      'catchphrase': [],
      'turnover': [],
      'industry': [],
      'address': [],
      'url': [],
      'logo': [],
      'tagLabel': [],
      'showMap': []
    });
  }

  ngOnInit() {
    this.loadTagsList();
  }

  getPosition($event) {
    this.newCompanyLatitude = $event.coords.lat;
    this.newCompanyLongitude = $event.coords.lng;
  }

  addTag(label: string) {
    this.tagService.tagExists(label).subscribe(resp => {
      if (label.trim() !== '' && !resp) {
        this.tagService.addTag(label)
          .then(response => this.tags.push(response));
      }});
  }

  loadTagsList() {
    this.tagService.getTags().then(response => this.tags = response);
  }

  saveCompany(company: Company) {
    if (this.showMap) {
      company.longitude = this.newCompanyLongitude;
      company.latitude = this.newCompanyLatitude;
    } else {
      company.longitude = null;
      company.latitude = null;
    }
    this.companyService.saveCompany(company, this.newCompanyTags)
      .subscribe(response => {
        this.newCompany = response.json();
        this.companyService.attachTagsToCompany(response.json().id, this.newCompanyTags)
          .then(resp => this.router.navigate(['companies/all', response.json().id]));
      });
  }

  toggleCompanyTag(tag: Tag, isChecked: boolean) {
    if (isChecked) {
      this.newCompanyTags.push(tag);
    } else {
      this.newCompanyTags.splice(this.newCompanyTags.indexOf(tag),1);
    }
    this.newCompanyTags.length ? this.showTags = true : this.showTags = false;
  }
}
