import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'trip-ola-city',
  templateUrl: './trip-ola-city.component.html',
  styleUrls: ['./trip-ola-city.component.scss']
})
export class TripOlaCityComponent implements OnInit {
  private _vehicleType = '';
  public newTrip: number;

  @Input()
  public item: FormGroup;

  @Input()
  public index: number;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public drivers: Array<any>;

  @Input()
  set vehicleType(vehicleType: string) {
    // intercept and patch form value
    this._vehicleType = vehicleType;
    this.item.patchValue({
      vehicleType: vehicleType
    });
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  get vehicleType(): string { return this._vehicleType; }

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
