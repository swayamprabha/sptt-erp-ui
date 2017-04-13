import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { DaySummaryComponent } from './containers/day-summary/day-summary.component';
import { DayWiseFormComponent } from './containers/day-wise-form/day-wise-form.component';


// route resolver
import { DayWiseFormResolver } from './containers/day-wise-form/day-wise-form-resolver.service';

const routes: Routes = [
  { path: '', component: DaySummaryComponent },
  { path: 'new', component: DayWiseFormComponent },
  {
    path: ':id',
    component: DayWiseFormComponent,
    resolve: {
      alldaySummary: DayWiseFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    DayWiseFormResolver
  ]
})
export class DataEntryModuleRoutingModule {}
