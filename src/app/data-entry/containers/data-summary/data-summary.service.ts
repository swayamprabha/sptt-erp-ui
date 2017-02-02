import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { State } from "clarity-angular";
import { environment } from '../../../../environments/environment';

@Injectable()
export class DataSummaryService {
  private _sortReverse: string;
  private _summaryType: string = 'AlldaySummaries';
  private _sortBy: string;
  private _sortSegment: string = '';
  private _relationSegment: string = '';
  constructor(private http: Http) { }

  summaryType(tripToggle: boolean): DataSummaryService {
    this._summaryType = tripToggle ? 'TripSummaries' : 'AlldaySummaries';
    if (this._summaryType === 'AlldaySummaries') {
      this._relationSegment = '&filter[include]=vehicle&filter[include]=driver';
    } else {
      this._relationSegment = '&filter[include]=alldaySummary';
    }
    return this;
  }

  filter(filters: { [key: string]: string[] }): DataSummaryService {
    if (filters) {
      console.log(filters);
    }
    return this;
  }
  sort(sort: { by: string, reverse: boolean }): DataSummaryService {
    if (sort && sort.by) {
      this._sortReverse = sort.reverse ? 'DESC' : 'ASC';
      this._sortBy = sort.by;
      this._sortSegment = `&filter[order]=${this._sortBy} ${this._sortReverse}`;
    } else {
      this._sortSegment = '';
    }
    return this;
  }
  fetch(skip: number = 0, limit: number = 10): Observable<any[]> {

    return Observable.forkJoin(
      this.http.get(`${environment.apiUrl}/${this._summaryType}/count`).map((res: Response) => res.json()),
      this.http.get(`${environment.apiUrl}/${this._summaryType}?filter[limit]=${limit}&filter[skip]=${skip}${this._relationSegment}${this._sortSegment}`)
        .map((response: Response) => response.json())
    );
  }
}