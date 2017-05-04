import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { VehicleSummaryService } from './vehicle-summary.service';
import { State } from "clarity-angular";

@Component({
  selector: 'vehicle-summary',
  templateUrl: './vehicle-summary.component.html',
  styleUrls: ['./vehicle-summary.component.scss']
})
export class VehicleSummaryComponent implements OnInit {

  total: number;
  loading: boolean = true;
  results: any[];
  currentPageSize: Number = 14;

  constructor(
    private vehicleService: VehicleSummaryService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('SPTT - Vehicle Summary');
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
    this.vehicleService
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
