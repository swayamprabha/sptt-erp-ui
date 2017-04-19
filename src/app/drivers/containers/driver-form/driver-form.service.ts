import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class DriverFormService {

  constructor(private http: Http) { }

  getNewDriver(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/Drivers/${id}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().status));

  }

  getSubcategories(): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/RankCatergories`)
      .map((response: Response) => response.json());
  }

  saveNewDriver(payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/Drivers`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

  deleteDriver(id: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/Drivers/${id}`)
      .map((response: Response) => response.json())
  }

  updateDriver(id: string, payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/Drivers/${id}`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

}
