import { SharedModule } from './../shared/shared.module';
import { ClarityModule } from 'clarity-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// containers
import { DaySummaryComponent } from './containers/day-summary/day-summary.component';
import { DayWiseFormComponent } from './containers/day-wise-form/day-wise-form.component';
import { TripWiseFormComponent } from './containers/trip-wise-form/trip-wise-form.component';
import { TripSummaryComponent } from './containers/trip-summary/trip-summary.component';

// components
// import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
// import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
// import { PassengerFormComponent } from './components/passenger-form/passenger-form.component';

// service
import { DaySummaryService } from './containers/day-summary/day-summary.service';
import { DayWiseFormService } from './containers/day-wise-form/day-wise-form.service';
import { DayWiseFormResolver } from './containers/day-wise-form/day-wise-form-resolver.service';
import { TripSummaryService } from './containers/trip-summary/trip-summary.service';

const routes: Routes = [
  {
    path: 'data-entry',
    children: [
      { path: '', component: DaySummaryComponent },
      { path: 'new', component: DayWiseFormComponent },
      {
        path: ':id',
        component: DayWiseFormComponent,
        resolve: {
          alldaySummary: DayWiseFormResolver
        }
      },
      {
        path: ':id/trips',
        component: TripSummaryComponent,
        resolve: {
          alldaySummary: DayWiseFormResolver
        }
      },
      {
        path: ':id/trip/new',
        component: TripWiseFormComponent
      },
      {
        path: ':id/trip/:trip-id',
        component: TripWiseFormComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    DaySummaryComponent,
    DayWiseFormComponent,
    TripSummaryComponent,
    TripWiseFormComponent
  ],
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [
    DaySummaryService,
    DayWiseFormService,
    DayWiseFormResolver,
    TripSummaryService
  ]
})
export class DataEntryModule { }