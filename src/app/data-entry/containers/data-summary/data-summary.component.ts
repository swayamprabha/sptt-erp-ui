import { Component, OnInit } from '@angular/core';
import { DataSummaryService } from './data-summary.service';
//import { Passenger } from '../../models/passenger.interface';
import { State } from "clarity-angular";

@Component({
    selector: 'data-summary',
    styleUrls: ['data-summary.component.scss'],
    templateUrl: './data-summary.component.html',
})
export class DataSummaryComponent {
    constructor(private dataSummaryService: DataSummaryService) { }
    total: number;
    loading: boolean = true;
    isTrip: boolean = false;
    resetting: boolean = false;
    results: any[];

    toggleTripSummary() {
        this.resetting = true;
        this.loading = true;
        // Timeout hack to make sure we completely reset the datagrid
        setTimeout(() => {
            this.isTrip = !this.isTrip;
            this.results = [];
            this.resetting = false;
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
        this.dataSummaryService
            .summaryType(this.isTrip)
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