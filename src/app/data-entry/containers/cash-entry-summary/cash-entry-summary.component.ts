import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { State } from "clarity-angular";

import { CashEntrySummaryService } from './cash-entry-summary.service';

@Component({
  selector: 'cash-entry-summary',
  templateUrl: './cash-entry-summary.component.html',
})
export class CashEntrySummaryComponent implements OnInit {

  total: number;
  loading: boolean = true;
  results: any[];
  currentPageSize: Number = 14;

  constructor(
    private CashEntrySummaryService: CashEntrySummaryService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('SPTT - Cash Entry Summary');
  }

  refresh(state: State) {
    this.loading = true;
    // We convert the filters from an array to a map,
    // because that's what our backend-calling service is expecting
    let filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      for (let filter of state.filters) {
        let { property, value } = <{ property: string, value: string }>filter;
        filters[property] = [value];
      }
    }
    this.CashEntrySummaryService
      .filter(filters)
      .sort(<{ by: string, reverse: boolean }>state.sort)
      .fetch(state.page.from, state.page.size)
      .subscribe((result: any) => {
        this.results = result;
        this.total = result.length;
        this.loading = false;
      });
  }
}
