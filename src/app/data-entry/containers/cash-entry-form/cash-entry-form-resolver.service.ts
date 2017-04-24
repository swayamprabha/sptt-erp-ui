import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { CashEntryFormService } from './cash-entry-form.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

@Injectable()
export class CashEntryFormResolver implements Resolve<any> {
  constructor(private cashEntryFormService: CashEntryFormService, private router: Router) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <any> {
    let id = route.params['id'];
    return this.cashEntryFormService.getCashEntry(id)
    .map(data => {
        return data;
    })
     .catch(data => {
        this.router.navigate(['/cash-entry']);
        return Observable.of(null);
     })
    .first();
  }
}