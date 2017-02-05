/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DaySummaryService } from './day-summary.service';

describe('DataSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DaySummaryService]
    });
  });

  it('should ...', inject([DaySummaryService], (service: DaySummaryService) => {
    expect(service).toBeTruthy();
  }));
});
