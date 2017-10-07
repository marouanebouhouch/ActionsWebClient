import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
    return this.http.put(companiesUrl + '/' + company_id + '/' + 'tags/' + tag_id, this.headers)
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred****', error);
    return Promise.reject(error.message || error);
  }
}
