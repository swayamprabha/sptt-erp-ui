import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { State } from 'clarity-angular';
import { environment } from '../../../../environments/environment';

@Injectable()
export class VehicleSummaryService {

  private _sortReverse: string;
  private _sortBy: string;
  private _sortSegment: string = '';
  private _relationSegment: string = '&filter[include]=vehicleCategory&filter[include]=rankCatergory';

  constructor(private http: Http) { }

  filter(filters: { [key: string]: string[] }): VehicleSummaryService {
    if (filters) {
      console.log("Filters =>" + JSON.stringify(filters));
    }
    return this;
  }
  sort(sort: { by: string, reverse: boolean }): VehicleSummaryService {
    if (sort && sort.by) {
      this._sortReverse = sort.reverse ? 'DESC' : 'ASC';
      this._sortBy = sort.by;
      this._sortSegment = `&filter[order]=${this._sortBy} ${this._sortReverse}`;
    } else {
      this._sortSegment = '&filter[order]=id DESC';
    }
    return this;
  }
  fetch(skip: number = 0, limit: number): Observable<any[]> {

    return Observable.forkJoin(
      this.http.get(`${environment.apiUrl}/Vehicles/count`).map((res: Response) => res.json()),
      this.http.get(`${environment.apiUrl}/Vehicles?filter[limit]=${limit}&filter[skip]=${skip}${this._relationSegment}${this._sortSegment}`)
        .map((response: Response) => response.json())
    );
  }
}