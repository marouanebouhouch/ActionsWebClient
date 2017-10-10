import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Company} from '../interfaces/company';
import {Tag} from '../interfaces/tag';
import {forEach} from '@angular/router/src/utils/collection';

const companiesUrl = 'http://localhost:8080/companies';

@Injectable()
export class CompanyService {
  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getCompanies() {
    return this.http.get(companiesUrl)
      .toPromise()
      .then(response => response.json()._embedded.companies)
      .catch(this.handleError);
  }

  getCompany(id: number) {
    return this.http.get(companiesUrl + '/' + id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  deleteCompany(id: number) {
    return this.http.delete(companiesUrl + '/' + id)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  removeTagFromCompany(company_id: number, tag_id: number) {
    return this.http.put(companiesUrl + '/' + company_id + '/' + 'removetag/' + tag_id, this.headers)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
  saveCompany(company: Company, tags: Tag[]) {
    this.http.post(companiesUrl, company)
      .toPromise()
      .then(resp => {
        tags.forEach(tag => {
          console.log(companiesUrl + '/' + resp.json().id + '/' + 'attachtag/' + tag.id);
          this.http.put(companiesUrl + '/' + resp.json().id + '/' + 'attachtag/' + tag.id, this.headers)
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
        });
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in company service');
    return Promise.reject(error.message || error);
  }
}
