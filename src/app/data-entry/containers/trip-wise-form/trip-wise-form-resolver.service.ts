import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { TripWiseFormService } from './trip-wise-form.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

@Injectable()
export class TripWiseFormResolver implements Resolve<any> {
  constructor(private tripWiseFormService: TripWiseFormService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <any> {
    let id = route.params['trip-id'];
    return this.tripWiseFormService.getTripSummary(id)
    .map(data => {
        return data;
    })
     .catch(data => {
        this.router.navigate(['/day-summary']);
        return Observable.of(null);
     })
    .first();
  }
}