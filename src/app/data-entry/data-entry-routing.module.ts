import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { DaySummaryComponent } from './containers/day-summary/day-summary.component';
import { DayWiseFormComponent } from './containers/day-wise-form/day-wise-form.component';
import { CashEntrySummaryComponent } from './containers/cash-entry-summary/cash-entry-summary.component';
import { CashEntryFormComponent } from './containers/cash-entry-form/cash-entry-form.component';

// route resolver
import { DayWiseFormResolver } from './containers/day-wise-form/day-wise-form-resolver.service';
import { CashEntryFormResolver } from './containers/cash-entry-form/cash-entry-form-resolver.service';

const routes: Routes = [
  { path: '', component: DaySummaryComponent },
  { path: 'new', component: DayWiseFormComponent },
  { path: 'cash-entry', component: CashEntrySummaryComponent },
  { path: 'cash-entry/new', component: CashEntryFormComponent },
  {
    path: 'cash-entry/:id',
    component: CashEntryFormComponent,
    resolve: {
      cashEntry: CashEntryFormResolver
    }
  },
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
    DayWiseFormResolver,
    CashEntryFormResolver
  ]
})
export class DataEntryModuleRoutingModule { }
