import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOtherOutstationComponent } from './trip-other-outstation.component';

describe('TripOtherOutstationComponent', () => {
  let component: TripOtherOutstationComponent;
  let fixture: ComponentFixture<TripOtherOutstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripOtherOutstationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripOtherOutstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
