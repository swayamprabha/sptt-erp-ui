import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { DriverSummaryComponent } from './containers/driver-summary/driver-summary.component';
import { DriverFormComponent } from './containers/driver-form/driver-form.component';

// route resolver
import { DriverFormResolver } from './containers/driver-form/driver-form-resolver.service';

const routes: Routes = [
  { path: '', component: DriverSummaryComponent },
  { path: 'new', component: DriverFormComponent },
  {
    path: ':id',
    component: DriverFormComponent,
    resolve: {
      driver: DriverFormResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
   providers: [
    DriverFormResolver
  ]
})
export class DriverRoutingModule {}