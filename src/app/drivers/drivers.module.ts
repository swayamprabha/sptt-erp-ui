import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { SharedModule } from './../shared/shared.module';

// containers
import { DriverSummaryComponent } from './containers/driver-summary/driver-summary.component';
import { DriverFormComponent } from './containers/driver-form/driver-form.component';

// services
import { DriverSummaryService } from './containers/driver-summary/driver-summary.service';
import { DriverFormService } from './containers/driver-form/driver-form.service';

// driver routing module
import { DriverRoutingModule }    from './driver-routing.module';

@NgModule({
  imports: [
    ClarityModule.forChild(),
    SharedModule,
    DriverRoutingModule
  ],
  declarations: [
    DriverSummaryComponent,
    DriverFormComponent
    ],
  providers: [
    DriverSummaryService,
    DriverFormService,
  ]
})
export class DriversModule { }
