import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { State } from 'clarity-angular';
import { environment } from '../../../../environments/environment';

@Injectable()
export class DriverSummaryService {

  private _sortReverse: string;
  private _sortBy: string;
  private _sortSegment: string = '';
  private _relationSegment: string = '&filter[include]=rankCatergory';

  constructor(private http: Http) { }

  filter(filters: { [key: string]: string[] }): DriverSummaryService {
    if (filters) {
      console.log("Filters =>" + JSON.stringify(filters));
    }
    return this;
  }
  sort(sort: { by: string, reverse: boolean }): DriverSummaryService {
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
    return this.http
      .get(`${environment.apiUrl}/Drivers?filter[limit]=${limit}&filter[skip]=${skip}${this._relationSegment}${this._sortSegment}`)
      .map((response: Response) => response.json());
  }
}