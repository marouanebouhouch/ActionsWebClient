import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Company} from '../interfaces/company';
import {Tag} from '../interfaces/tag';
import {forEach} from '@angular/router/src/utils/collection';
import {Router} from '@angular/router';

const companiesUrl = 'http://localhost:8080/companies';

@Injectable()
export class CompanyService {
  constructor(private http: Http, private router: Router) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getCompanies() {
    return this.http.get(companiesUrl)
      .map(response => response.json()._embedded.companies)
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
    return this.http.post(companiesUrl, company)
      .map( response => {
        response.json().tags = tags;
        return response;
      })
  }

  updateCompany(company: Company, tags: Tag[]) {
    return this.http.put(companiesUrl, company)
      .map( response => {
        let company_id = response.json().id;
        this.removeTagsfromCompany(company_id)
          .then(response =>
            this.attachTagsToCompany(company_id, tags)
              .then(() => null)
          )
        return response;
      })
  }

  attachTagsToCompany(company_id: number, tags: Tag[]) {
    return this.http.put(companiesUrl + '/' + company_id + '/attachtags' , tags, this.headers)
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  removeTagsfromCompany(company_id: number) {
    return this.http.put(companiesUrl + '/' + company_id + '/removeTags', this.headers )
      .toPromise()
      .then(resp => resp.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in company service');
    return Promise.reject(error.message || error);
  }
}
