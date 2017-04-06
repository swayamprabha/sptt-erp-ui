import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOlaOutstationComponent } from './trip-ola-outstation.component';

describe('TripOlaOutstationComponent', () => {
  let component: TripOlaOutstationComponent;
  let fixture: ComponentFixture<TripOlaOutstationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripOlaOutstationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripOlaOutstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
