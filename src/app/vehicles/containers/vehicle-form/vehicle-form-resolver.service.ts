import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { VehicleFormService } from './vehicle-form.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

@Injectable()
export class VehicleFormResolver implements Resolve<any> {
  constructor(private vehicleFormService: VehicleFormService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <any> {
    let id = route.params['id'];
    return this.vehicleFormService.getNewVehicle(id)
    .map(data => {
        return data;
    })
     .catch(data => {
        this.router.navigate(['/vehicles']);
        return Observable.of(null);
     })
    .first();
  }
}