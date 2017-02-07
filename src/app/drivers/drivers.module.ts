import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { SharedModule } from './../shared/shared.module';

// containers
import { DriverSummaryComponent } from './containers/driver-summary/driver-summary.component';

// services
import { DriverSummaryService } from './containers/driver-summary/driver-summary.service';

const routes: Routes = [
  {
    path: 'drivers',
    children: [
      { path: '', component: DriverSummaryComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    SharedModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  declarations: [DriverSummaryComponent],
  providers: [
    DriverSummaryService
  ]
})
export class DriversModule { }
