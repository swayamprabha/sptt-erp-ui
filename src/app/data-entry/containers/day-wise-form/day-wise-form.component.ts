import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { DayWiseFormService } from './day-wise-form.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-day-wise-form',
  templateUrl: './day-wise-form.component.html',
  styleUrls: ['./day-wise-form.component.scss']
})
export class DayWiseFormComponent implements OnInit {
  vehicles: any[];
  drivers: any[];

  constructor(private route: ActivatedRoute, private dayWiseFormService:DayWiseFormService) { }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      //.switchMap((params: Params) => {
        //this.service.getHero(+params['id'])
     // })
      .subscribe((params: Params) => console.log(params));
    
    // Get list of Vehicles  
    this.dayWiseFormService
      .getVehicles()
      .subscribe((data) => this.vehicles = data);
    
    // Get list of Drivers
     this.dayWiseFormService
      .getDrivers()
      .subscribe((data) => this.drivers = data);
  }

}
