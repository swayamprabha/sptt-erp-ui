import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripOlaCityComponent } from './trip-ola-city.component';

describe('TripOlaCityComponent', () => {
  let component: TripOlaCityComponent;
  let fixture: ComponentFixture<TripOlaCityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripOlaCityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripOlaCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
