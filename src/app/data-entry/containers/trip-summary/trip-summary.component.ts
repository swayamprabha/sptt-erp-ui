import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { State } from "clarity-angular";
import { TripSummaryService } from './trip-summary.service';

@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.component.html',
  styleUrls: ['./trip-summary.component.scss']
})
export class TripSummaryComponent implements OnInit {

  alldaySummary: any;
  total: number;
  loading: boolean = true;
  results: any[];
  currentPageSize: Number = 14;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripSummaryService: TripSummaryService
  ) { }

  ngOnInit() {
    // Get resolved alldaysummary data
    this.route.data
      .subscribe((data: { alldaySummary: any }) => {
       this.alldaySummary = data.alldaySummary;
      });
  }
  refresh(state: State) {
    this.loading = true;
    // We convert the filters from an array to a map,
    // because that's what our backend-calling service is expecting
    let filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      for (let filter of state.filters) {
        let {property, value} = <{ property: string, value: string }>filter;
        filters[property] = [value];
      }
    }
    this.tripSummaryService
      .filter(filters)
      .sort(<{ by: string, reverse: boolean }>state.sort)
      .fetch(this.alldaySummary.id, state.page.from, state.page.size)
      .subscribe((result: any) => {
        this.results = result[1];
        this.total = result[0].count;
        this.loading = false;
      });
  }

}
