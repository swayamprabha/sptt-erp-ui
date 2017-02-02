import { SharedModule } from './../shared/shared.module';
import { ClarityModule } from 'clarity-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// containers
import { DataSummaryComponent } from './containers/data-summary/data-summary.component';
import { DayWiseFormComponent } from './containers/day-wise-form/day-wise-form.component';

// components
// import { PassengerCountComponent } from './components/passenger-count/passenger-count.component';
// import { PassengerDetailComponent } from './components/passenger-detail/passenger-detail.component';
// import { PassengerFormComponent } from './components/passenger-form/passenger-form.component';

// service
import { DataSummaryService } from './containers/data-summary/data-summary.service';

const routes: Routes = [
  {
    path: 'data-entry',
    children: [
     { path: '', component: DataSummaryComponent},
     { path: 'new', component: DayWiseFormComponent },
     { path: ':id/edit', component: DayWiseFormComponent },
   //  { path: '/day-wise/:id/trip-wise', component: PassengerViewerComponent }
    ]
  }
];

@NgModule({
  declarations: [
     DataSummaryComponent,
     DayWiseFormComponent
    // PassengerViewerComponent,
    // PassengerCountComponent,
    // PassengerDetailComponent,
    //PassengerFormComponent
  ],
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  providers: [
    DataSummaryService
  ]
})
export class DataEntryModule {}