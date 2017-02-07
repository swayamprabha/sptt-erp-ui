import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { SharedModule } from './../shared/shared.module';

// containers
import { DriverSummaryComponent } from './containers/driver-summary/driver-summary.component';
import { DriverFormComponent } from './containers/driver-form/driver-form.component';

// services
import { DriverSummaryService } from './containers/driver-summary/driver-summary.service';
import { DriverFormService } from './containers/driver-form/driver-form.service';
import { DriverFormResolver } from './containers/driver-form/driver-form-resolver.service';

const routes: Routes = [
  {
    path: 'drivers',
    children: [
      { path: '', component: DriverSummaryComponent },
      { path: 'new', component: DriverFormComponent },
      {
        path: ':id',
        component: DriverFormComponent,
        resolve: {
          driver: DriverFormResolver
        }
      }
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
  declarations: [
    DriverSummaryComponent,
    DriverFormComponent],
  providers: [
    DriverSummaryService,
    DriverFormService,
    DriverFormResolver
  ]
})
export class DriversModule { }
