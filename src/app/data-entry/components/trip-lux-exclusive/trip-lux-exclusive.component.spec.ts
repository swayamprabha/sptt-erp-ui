import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripLuxExclusiveComponent } from './trip-lux-exclusive.component';

describe('TripLuxExclusiveComponent', () => {
  let component: TripLuxExclusiveComponent;
  let fixture: ComponentFixture<TripLuxExclusiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripLuxExclusiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripLuxExclusiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
