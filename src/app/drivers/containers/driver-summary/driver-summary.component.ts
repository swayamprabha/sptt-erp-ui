import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DriverSummaryService } from './driver-summary.service';
import { State } from "clarity-angular";

@Component({
  selector: 'driver-summary',
  templateUrl: './driver-summary.component.html',
  styleUrls: ['./driver-summary.component.scss']
})
export class DriverSummaryComponent implements OnInit {

  total: number;
  loading: boolean = true;
  results: any[];
  currentPageSize: Number = 14;

  constructor(
    private driverService: DriverSummaryService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('SPTT - Driver Summary');
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
    this.driverService
      .filter(filters)
      .sort(<{ by: string, reverse: boolean }>state.sort)
      .fetch(state.page.from, state.page.size)
      .subscribe((result: any) => {
        this.results = result[1];
        this.total = result[0].count;
        this.loading = false;
      });
  }
}
