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

// vehicle routing module
import { VehicleRoutingModule }    from './vehicle-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule.forChild(),
    SharedModule.forRoot(),
    VehicleRoutingModule
  ],
  declarations: [
    VehicleSummaryComponent,
    VehicleFormComponent
    ],
  providers: [
    VehicleSummaryService,
    VehicleFormService,
  ]
})
export class VehiclesModule { }
