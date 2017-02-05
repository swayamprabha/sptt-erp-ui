/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TripSummaryService } from './trip-summary.service';

describe('TripSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripSummaryService]
    });
  });

  it('should ...', inject([TripSummaryService], (service: TripSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
