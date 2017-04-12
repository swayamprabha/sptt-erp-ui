import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'trip-other-outstation',
  templateUrl: './trip-other-outstation.component.html',
  styleUrls: ['./trip-other-outstation.component.scss']
})
export class TripOtherOutstationComponent implements OnInit {

  @Input()
  public item: FormGroup;

  @Input()
  public index: number;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public drivers: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
