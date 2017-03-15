import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DaySummaryService } from './day-summary.service';
import { State } from "clarity-angular";

@Component({
    selector: 'day-summary',
    styleUrls: ['day-summary.component.scss'],
    templateUrl: './day-summary.component.html',
})
export class DaySummaryComponent implements OnInit {

    total: number;
    loading: boolean = true;
    results: any[];
    currentPageSize: Number = 14;

    constructor(
        private daySummaryService: DaySummaryService,
        private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('SPTT - Day Wise Summary');
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
        this.daySummaryService
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