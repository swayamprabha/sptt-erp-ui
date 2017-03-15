import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

import { State } from "clarity-angular";
import { environment } from '../../../../environments/environment';

@Injectable()
export class TripSummaryService {
  private _sortReverse: string;
  private _summaryType: string = 'TripSummaries';
  private _sortBy: string;
  private _sortSegment: string = '';
  private _relationSegment: string = '';

  constructor(private http: Http) { }

  filter(filters: { [key: string]: string[] }): TripSummaryService {
    if (filters) {
      console.log("Filters =>" + JSON.stringify(filters));
    }
    return this;
  }
  sort(sort: { by: string, reverse: boolean }): TripSummaryService {
    if (sort && sort.by) {
      this._sortReverse = sort.reverse ? 'DESC' : 'ASC';
      this._sortBy = sort.by;
      this._sortSegment = `&filter[order]=${this._sortBy} ${this._sortReverse}`;
    } else {
      this._sortSegment = '&filter[order]=id DESC';
    }
    return this;
  }
  fetch(alldaySummaryId: string, skip: number = 0, limit: number): Observable<any[]> {
    return this.http
      .get(`${environment.apiUrl}/${this._summaryType}?filter[where][alldaySummaryId]=${alldaySummaryId}&filter[limit]=${limit}&filter[skip]=${skip}${this._relationSegment}${this._sortSegment}`)
      .map((response: Response) => response.json());
  }

}
