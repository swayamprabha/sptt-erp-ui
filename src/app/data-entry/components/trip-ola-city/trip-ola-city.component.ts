import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'trip-ola-city',
  templateUrl: './trip-ola-city.component.html',
  styleUrls: ['./trip-ola-city.component.scss']
})
export class TripOlaCityComponent implements OnInit {
  public newTrip: number;

  @Input()
  public item: FormGroup;

  @Input()
  public index: number;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public drivers: Array<any>;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }
  get rideKMSs(): FormArray {
    return this.item.get('rideKMSs') as FormArray;
  };

  addTrip(trip: Number) {
    if (trip) {
      this.rideKMSs.push(this.fb.control(trip));
      this.newTrip = null;
    }
  }
}
