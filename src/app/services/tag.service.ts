import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Company} from '../interfaces/company';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs/Observable';


const tagsUrl = 'http://localhost:8080/tags';
const companiesUrl = 'http://localhost:8080/companies';

@Injectable()
export class TagService {

  constructor(private http: Http) { }

  getTags() {
    return this.http.get(tagsUrl)
      .toPromise()
      .then(response => response.json()._embedded.tags)
      .catch(this.handleError);
  }

  getTagsByCompany(company: Company) {
    return this.http.get(companiesUrl + '/' + company.id + '/tags')
      .toPromise()
      .then(response => response.json()._embedded.tags)
      .catch(this.handleError);
  }

  addTag(label: string) {
    return this.http.post(tagsUrl, {label: label})
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  tagExists(label: string) {
    return this.http.get(tagsUrl + '/exists?label=' + label )
      .map(res => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred****', error);
    return Promise.reject(error.message || error);
  }
}
