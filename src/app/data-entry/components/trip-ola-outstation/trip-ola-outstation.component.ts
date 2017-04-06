import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'trip-ola-outstation',
  templateUrl: './trip-ola-outstation.component.html',
  styleUrls: ['./trip-ola-outstation.component.scss']
})
export class TripOlaOutstationComponent implements OnInit {

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
