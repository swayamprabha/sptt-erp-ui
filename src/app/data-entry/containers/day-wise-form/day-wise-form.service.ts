import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class DayWiseFormService {

  constructor(private http: Http) { }
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

  getAllDaySummary(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/AlldaySummaries/${id}?filter[include]=vehicle&filter[include]=driver`)
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().status));

  }
  saveNewDailySummary(payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/AlldaySummaries`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

  updateDailySummary(id: string, payload: any){
  let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/AlldaySummaries/${id}`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }
}
