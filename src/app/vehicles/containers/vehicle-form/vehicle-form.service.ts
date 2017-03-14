import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from './../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class VehicleFormService {

  constructor(private http: Http) { }

  getNewVehicle(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/Vehicles/${id}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().status));

  }

  getCategories(): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/VehicleCategories`)
      .map((response: Response) => response.json());
  }

  saveNewVehicle(payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/Vehicles`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

  deleteVehicle(id: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/Vehicles/${id}`)
      .map((response: Response) => response.json())
  }

  updateVehicle(id: string, payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/Vehicles/${id}`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

}
