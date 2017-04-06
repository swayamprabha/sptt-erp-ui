import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOtherCityComponent } from './trip-other-city.component';

describe('TripOtherCityComponent', () => {
  let component: TripOtherCityComponent;
  let fixture: ComponentFixture<TripOtherCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripOtherCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripOtherCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
