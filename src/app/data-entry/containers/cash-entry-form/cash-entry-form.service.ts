import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class CashEntryFormService {

  constructor(
    private http: Http,
    private fb: FormBuilder
  ) { }

  getVehicles(): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/Vehicles`)
      .map((response: Response) => response.json());
  }

  getDrivers(): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/Drivers`)
      .map((response: Response) => response.json());
  }

  saveNewCashEntry(payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/CashEntries`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

  deleteCashEntry(id: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/CashEntries/${id}`)
      .map((response: Response) => response.json())
  }

  getCashEntry(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/CashEntries/${id}?filter[include]=vehicle&filter[include]=driver`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().status));

  }
  updateCashEntry(id: string, payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/CashEntries/${id}`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }
}
