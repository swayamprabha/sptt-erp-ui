import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-day-wise-form',
  templateUrl: './day-wise-form.component.html',
  styleUrls: ['./day-wise-form.component.scss']
})
export class DayWiseFormComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.route.params
      // (+) converts string 'id' to a number
      //.switchMap((params: Params) => {
        //this.service.getHero(+params['id'])
     // })
      .subscribe((params: Params) => console.log(params));
  }

}
