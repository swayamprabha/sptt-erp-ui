/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AboutComponent } from './about/about.component';


export const routes: Routes = [
  { path: '', redirectTo: '/day-summary', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'day-summary', loadChildren: 'app/data-entry/data-entry.module#DataEntryModule' },
  { path: 'drivers', loadChildren: 'app/drivers/drivers.module#DriversModule' },
  { path: 'vehicles', loadChildren: 'app/vehicles/vehicles.module#VehiclesModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
    , { preloadingStrategy: PreloadAllModules }
  )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
