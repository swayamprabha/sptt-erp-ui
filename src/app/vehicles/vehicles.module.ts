import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { SharedModule } from './../shared/shared.module';

// containers
import { VehicleSummaryComponent } from './containers/vehicle-summary/vehicle-summary.component';
import { VehicleFormComponent } from './containers/vehicle-form/vehicle-form.component';

// services
import { VehicleSummaryService } from './containers/vehicle-summary/vehicle-summary.service';
import { VehicleFormService } from './containers/vehicle-form/vehicle-form.service';
import { VehicleFormResolver } from './containers/vehicle-form/vehicle-form-resolver.service';

const routes: Routes = [
  {
    path: 'vehicles',
    children: [
      { path: '', component: VehicleSummaryComponent },
      { path: 'new', component: VehicleFormComponent },
      {
        path: ':id',
        component: VehicleFormComponent,
        resolve: {
          vehicle: VehicleFormResolver
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
    VehicleSummaryComponent,
    VehicleFormComponent],
  providers: [
    VehicleSummaryService,
    VehicleFormService,
    VehicleFormResolver
  ]
})
export class VehiclesModule { }
