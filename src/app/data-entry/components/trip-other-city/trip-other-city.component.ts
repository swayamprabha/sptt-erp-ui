import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'trip-other-city',
  templateUrl: './trip-other-city.component.html',
  styleUrls: ['./trip-other-city.component.scss']
})
export class TripOtherCityComponent implements OnInit {

   constructor() { }
  @Input()
  public item: FormGroup;

  @Input()
  public index: number;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
  }

}
