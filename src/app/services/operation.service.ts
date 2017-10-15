import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

const companiesUrl = 'http://localhost:8080/companies';

@Injectable()
export class OperationService {

  constructor(private http: Http) { }

  getSellsByCompany(company_id: number) {
    return this.http.get(companiesUrl + '/' + company_id + '/sells')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getBuysByCompany(company_id: number) {
    return this.http.get(companiesUrl + '/' + company_id + '/buys')
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred in company service');
    return Promise.reject(error.message || error);
  }
}
