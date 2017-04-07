import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import { VehicleSummaryComponent } from './containers/vehicle-summary/vehicle-summary.component';
import { VehicleFormComponent } from './containers/vehicle-form/vehicle-form.component';

// route resolver
import { VehicleFormResolver } from './containers/vehicle-form/vehicle-form-resolver.service';

const routes: Routes = [
    { path: '', component: VehicleSummaryComponent },
    { path: 'new', component: VehicleFormComponent },
    {
        path: ':id',
        component: VehicleFormComponent,
        resolve: {
            vehicle: VehicleFormResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        VehicleFormResolver
    ]
})
export class VehicleRoutingModule { }