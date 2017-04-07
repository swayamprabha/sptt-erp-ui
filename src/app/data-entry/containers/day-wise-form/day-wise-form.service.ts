import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, Validators } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class DayWiseFormService {

  constructor(
    private http: Http,
    private fb: FormBuilder
  ) { }
  getVehicles(vehicleType: string): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/Vehicles?filter[where][ownershipType]=${vehicleType}`)
      .map((response: Response) => response.json());
  }

  getDrivers(): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/Drivers`)
      .map((response: Response) => response.json());
  }

  getOperators(vehicleCategoryId: string): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/OperatorCategories?filter[where][vehicleCategories][inq]=${vehicleCategoryId}`)
      .map((response: Response) => response.json());
  }

  getAllDaySummary(id: string): Observable<any> {
    return this.http
      .get(`${environment.apiUrl}/AlldaySummaries/${id}?filter[include]=vehicle`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json().status));

  }
  saveNewDailySummary(payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`${environment.apiUrl}/AlldaySummaries`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

  deleteDailySummary(id: string): Observable<any> {
    return this.http
      .delete(`${environment.apiUrl}/AlldaySummaries/${id}`)
      .map((response: Response) => response.json())
  }

  updateDailySummary(id: string, payload: any) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http
      .put(`${environment.apiUrl}/AlldaySummaries/${id}`, JSON.stringify(payload), options)
      .map((response: Response) => response.json());
  }

  createOperatorCategory(operatorName: string, vehicleType: string, ): Object {
    switch (operatorName) {
      case 'Ola-City': return {
        operatorCategory: ['Ola-City'],
        driverId: ['', Validators.required],
        vehicleType: [`${vehicleType}`],
        cashCollected: ['', Validators.required],
        olaMoney: [''],
        self: [''],
        airportToll: [''],
        rideEarnings: [''],
        totalTrips: [''],
        rideKMSs: this.fb.array([]),
      };
      case 'Ola-Outstation': {
        return {
          operatorCategory: ['Ola-Outstation'],
          driverId: ['', Validators.required],
          vehicleType: [`'${vehicleType}'`],
          rideKMS: ['', Validators.required],
          billAmmount: [''],
          cashCollected: [''],
          rideEarnings: ['', Validators.required],
          olaMoney: [''],
        };
      }
      case 'Other-City': {
        return {
          operatorCategory: ['Other-City'],
          driverId: ['', Validators.required],
          vehicleType: [`'${vehicleType}'`],
          customerName: [''],
          rideKMS: ['', Validators.required],
          billAmmount: [''],
          cashCollected: [''],
          rideEarnings: ['', Validators.required],
          onlinePayment: [''],
          balance: [''],
        };
      }
      case 'Other-Outstation': {
        return {
          operatorCategory: ['Other-Outstation'],
          driverId: ['', Validators.required],
          vehicleType: [`'${vehicleType}'`],
          customerName: [''],
          rideKMS: ['', Validators.required],
          billAmmount: [''],
          cashCollected: [''],
          rideEarnings: ['', Validators.required],
          onlinePayment: [''],
          balance: [''],
        };
      }
      case 'LUX-Exclusive': {
        return {
          operatorCategory: ['LUX-Exclusive'],
          driverId: ['', Validators.required],
          vehicleType: [`'${vehicleType}'`],
          customerName: [''],
          rideKMS: ['', Validators.required],
          cashCollected: [''],
          rideEarnings: ['', Validators.required],
          onlinePayment: [''],
          airportToll: [''],
          localToll: [''],
          incentives: ['']
        };
      }
    }
  }
}
