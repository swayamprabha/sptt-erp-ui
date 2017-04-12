import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'trip-other-outstation',
  templateUrl: './trip-other-outstation.component.html',
  styleUrls: ['./trip-other-outstation.component.scss']
})
export class TripOtherOutstationComponent implements OnInit {
  private _vehicleType = '';

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

  constructor() { }

  ngOnInit() {
  }

}
