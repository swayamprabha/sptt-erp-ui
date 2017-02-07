/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DriverSummaryService } from './driver-summary.service';

describe('DriverSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DriverSummaryService]
    });
  });

  it('should ...', inject([DriverSummaryService], (service: DriverSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
