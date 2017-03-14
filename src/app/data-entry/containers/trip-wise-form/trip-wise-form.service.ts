import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class TripWiseFormService {

  constructor(private http: Http) { }

  getTripSummary(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/TripSummaries/${id}`)
      .map((response: Response) => response.json())
      .catch((error:any) => Observable.throw(error.json().status));

  }

  getOperators(): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/OperatorCategories`)
      .map((response: Response) => response.json());
  }

  saveNewTripSummary(payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/TripSummaries`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

  deleteTripSummary(id: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/TripSummaries/${id}`)
      .map((response: Response) => response.json())
  }

  updateTripSummary(id: string, payload: any){
  let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/TripSummaries/${id}`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }
}
