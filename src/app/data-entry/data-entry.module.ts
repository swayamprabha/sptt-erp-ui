import { NgModule } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { SharedModule } from './../shared/shared.module';

// containers
import { DaySummaryComponent } from './containers/day-summary/day-summary.component';
import { DayWiseFormComponent } from './containers/day-wise-form/day-wise-form.component';

// components
import { TripOlaCityComponent } from './components/trip-ola-city/trip-ola-city.component';
import { TripOlaOutstationComponent } from './components/trip-ola-outstation/trip-ola-outstation.component';
import { TripOtherCityComponent } from './components/trip-other-city/trip-other-city.component';
import { TripOtherOutstationComponent } from './components/trip-other-outstation/trip-other-outstation.component';
import { TripLuxExclusiveComponent } from './components/trip-lux-exclusive/trip-lux-exclusive.component';

// service
import { DaySummaryService } from './containers/day-summary/day-summary.service';
import { DayWiseFormService } from './containers/day-wise-form/day-wise-form.service';

// driver routing module
import { DataEntryModuleRoutingModule }    from './data-entry-routing.module';

@NgModule({
  declarations: [
    DaySummaryComponent,
    DayWiseFormComponent,
    TripOlaCityComponent,
    TripOlaOutstationComponent,
    TripOtherCityComponent,
    TripOtherOutstationComponent,
    TripLuxExclusiveComponent
  ],
  imports: [
    ClarityModule.forChild(),
    SharedModule,
    DataEntryModuleRoutingModule
  ],
  providers: [
    DaySummaryService,
    DayWiseFormService
  ]
})
export class DataEntryModule {}
