import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'trip-lux-exclusive',
  templateUrl: './trip-lux-exclusive.component.html',
  styleUrls: ['./trip-lux-exclusive.component.scss']
})
export class TripLuxExclusiveComponent implements OnInit {

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
