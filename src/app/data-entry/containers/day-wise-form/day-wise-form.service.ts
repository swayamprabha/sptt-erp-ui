import { Observable } from 'rxjs/Observable';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class DayWiseFormService {

  constructor(private http: Http) { }
  getVehicles(): Observable<any[]>{
    return this.http
      .get(`${environment.apiUrl}/Vehicles`)
      .map((response: Response) => response.json());
  }

  getDrivers(): Observable<any[]>{
    return this.http
      .get(`${environment.apiUrl}/Drivers`)
      .map((response: Response) => response.json());
  }
}
