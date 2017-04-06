import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'trip-other-outstation',
  templateUrl: './trip-other-outstation.component.html',
  styleUrls: ['./trip-other-outstation.component.scss']
})
export class TripOtherOutstationComponent implements OnInit {

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
