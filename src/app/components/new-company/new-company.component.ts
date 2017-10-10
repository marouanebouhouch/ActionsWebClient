import { Component, OnInit } from '@angular/core';
import {Tag} from '../../interfaces/tag';
import {TagService} from '../../services/tag.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Company} from '../../interfaces/company';

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
  constructor(private tagService: TagService, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      'ceo': [],
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
        console.log(resp);
        this.tagService.addTag(label)
          .then(response => this.tags.push(response));
      }});
  }

  loadTagsList() {
    this.tagService.getTags().then(response => this.tags = response);
  }

  saveCompany(company: Company) {}

  toggleCompanyTag(tag: Tag, isChecked: boolean) {
    if (isChecked) {
      this.newCompanyTags.push(tag);
    } else {
      console.log('removed : ' + this.newCompanyTags.indexOf(tag));
      this.newCompanyTags.splice(this.newCompanyTags.indexOf(tag),1);
    }
    console.log(this.newCompanyTags);
    this.newCompanyTags.length ? this.showTags = true : this.showTags = false;
  }
}
