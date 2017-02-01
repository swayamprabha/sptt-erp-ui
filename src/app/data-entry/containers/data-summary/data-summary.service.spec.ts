/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DataSummaryService } from './data-summary.service';

describe('DataSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataSummaryService]
    });
  });

  it('should ...', inject([DataSummaryService], (service: DataSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
