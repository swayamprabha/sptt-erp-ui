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

  createOperatorCategory(operatorName: string): Object {
    switch (operatorName) {
      case 'Ola-City': return {
        operatorCategory: ['Ola-City'],
        driverId: [''],
        loginDuration: [''],
        vehicleType: [''],
        cashCollected: ['', Validators.required],
        olaMoney: [''],
        self: [''],
        airportToll: [''],
        localToll: [''],
        fuel: [''],
        fine: [''],
        penalty: [''],
        misc: [''],
        totalTrips: [''],
        rideKMSs: this.fb.array([])
      };
      case 'Ola-Outstation': {
        return {
          operatorCategory: ['Ola-Outstation'],
          driverId: [''],
          loginDuration: [''],
          vehicleType: [''],
          rideKMS: ['', Validators.required],
          rideEarnings: ['', Validators.required],
          cashCollected: [''],
          olaMoney: [''],
          bata: [''],
          localToll: [''],
          fuel: [''],
          fine: [''],
          misc: ['']
        };
      }
      case 'Other-City':{
        return {
          operatorCategory: ['Other-City'],
          driverId: [''],
          loginDuration: [''],
          vehicleType: [''],
          customerName: [''],
          rideKMS: ['', Validators.required],
          billAmmount: [''],
          cashCollected: [''],
          onlinePayment: [''],
          localToll: [''],
          bata: [''],
          fine: [''],
          misc: ['']
        };
      }
      case 'Other-Outstation': {
        return {
          operatorCategory: ['Other-Outstation'],
          driverId: [''],
          loginDuration: [''],
          vehicleType: [''],
          customerName: [''],
          rideKMS: ['', Validators.required],
          billAmmount: [''],
          cashCollected: [''],
          onlinePayment: [''],
          localToll: [''],
          bata: [''],
          fine: [''],
          misc: ['']
        };
      }
      case 'LUX-Exclusive': {
        return {
          operatorCategory: ['LUX-Exclusive'],
          driverId: [''],
          loginDuration: [''],
          vehicleType: [''],
          customerName: [''],
          rideKMS: ['', Validators.required],
          rideEarnings: ['', Validators.required],
          cashCollected: [''],
          olaMoney: [''],
          airportToll: [''],
          localToll: [''],
          incentives: [''],
          fine: [''],
          misc: ['']
        };
      }
    }
  }
}
