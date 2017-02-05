/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TripWiseFormComponent } from './trip-wise-form.component';

describe('TripWiseFormComponent', () => {
  let component: TripWiseFormComponent;
  let fixture: ComponentFixture<TripWiseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripWiseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripWiseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
