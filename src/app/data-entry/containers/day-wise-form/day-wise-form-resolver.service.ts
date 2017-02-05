import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { DayWiseFormService } from './day-wise-form.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

@Injectable()
export class DayWiseFormResolver implements Resolve<any> {
  constructor(private dayWiseFormService: DayWiseFormService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <any> {
    let id = route.params['id'];
    return this.dayWiseFormService.getAllDaySummary(id)
    .map(data => {
        return data;
    })
     .catch(data => {
        this.router.navigate(['/data-entry']);
        return Observable.of(null);
     })
    .first();
  }
}