import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'trip-ola-city',
  templateUrl: './trip-ola-city.component.html',
  styleUrls: ['./trip-ola-city.component.scss']
})
export class TripOlaCityComponent implements OnInit {
  newTrip: Number;

  constructor(
    private fb: FormBuilder,
  ) { }

  @Input()
  public item: FormGroup;

  @Input()
  public index: number;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit() {
  }
  get rideKMS(): FormArray {
    return this.item.get('rideKMS') as FormArray;
  };

  addTrip(trip: number) {
    if (trip) {
      this.rideKMS.push(this.fb.control(trip));
      this.newTrip = null;
    }
  }
}
