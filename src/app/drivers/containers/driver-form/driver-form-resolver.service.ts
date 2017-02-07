import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { DriverFormService } from './driver-form.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

@Injectable()
export class DriverFormResolver implements Resolve<any> {
  constructor(private driverFormService: DriverFormService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <any> {
    let id = route.params['id'];
    return this.driverFormService.getNewDriver(id)
    .map(data => {
        return data;
    })
     .catch(data => {
        this.router.navigate(['/drivers']);
        return Observable.of(null);
     })
    .first();
  }
}